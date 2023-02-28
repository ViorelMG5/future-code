import { db, storage } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { useContext } from "react";
import { createContext } from "react";

interface ProjectContextProps {
  uploadProject: (
    title: string,
    link: string,
    imagePreview: string,
    isVisible: string
  ) => Promise<void>;
  updateProject: (
    docId: string,
    newTitle: string,
    newLink: string,
    newImage: string | null,
    newIsVisible: string
  ) => Promise<void>;
  deleteProject: (projectId: string) => Promise<void>;
}
interface ProjectProviderProps {
  children: React.ReactNode;
}

export const ProjectContext = createContext<ProjectContextProps>({
  uploadProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
});

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const uploadProject = async (
    title: string,
    link: string,
    imagePreview: string,
    isVisible: string
  ) => {
    const docRef = await addDoc(collection(db, "projects"), {
      link: link,
      title: title,
      projectVisible: isVisible,
    });
    const imageRef = ref(storage, `projects/${docRef.id}/image`);

    await uploadString(
      imageRef,
      imagePreview ? imagePreview : "",
      "data_url"
    ).then(async (snapshot) => {
      const downloadUrl = await getDownloadURL(imageRef);
      await updateDoc(doc(db, "projects", docRef.id), { image: downloadUrl });
    });
  };

  const updateProject = async (
    docId: string,
    newTitle: string,
    newLink: string,
    newImage: string | null,
    newIsVisible: string
  ) => {
    const docRef = doc(db, "projects", docId);
    const docSnap = await getDoc(docRef);

    const currentTitle = docSnap.get("title");
    const currentLink = docSnap.get("link");
    const currentIsVisible = docSnap.get("projectVisible");

    const imageRef = ref(storage, `projects/${docRef.id}/image`);

    const updates: any = {};
    if (newTitle !== currentTitle) {
      updates.title = newTitle;
    }
    if (newLink !== currentLink) {
      updates.link = newLink;
    }
    if (newImage !== null) {
      await uploadString(imageRef, newImage ? newImage : "", "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "projects", docId), { image: downloadUrl });
        }
      );
    }
    if (newIsVisible !== currentIsVisible) {
      updates.projectVisible = newIsVisible;
    }

    if (Object.keys(updates).length > 0) {
      await updateDoc(docRef, updates);
    }
  };

  const deleteProject = async (projectId: string) => {
    await deleteDoc(doc(db, "projects", projectId));
    const imageRef = ref(storage, `projects/${projectId}/image`);
    await deleteObject(imageRef);
  };

  return (
    <ProjectContext.Provider
      value={{ uploadProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default function useProjectUtility() {
  return useContext(ProjectContext);
}
