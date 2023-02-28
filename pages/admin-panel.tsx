import Header from "@/components/Header";
import ProjectsList from "@/components/ProjectsList";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  projects: [];
}

export default function AdminPanel({ projects }: Props) {
  const router = useRouter();
  const [projectsList, setProjectsList] = useState<{ id: string }[]>([]);

  const { user, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjectsList(projectsData);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    router.push("/admin");
  }

  return (
    <main className="container mx-auto pt-28 px-4">
      <div className="flex items-center gap-4 py-2 px-2 my-4 md:px-10 justify-between rounded-xl bg-blue-100">
        <span className="text-xl ">
          Welcome Back!, here is where you can edit/delete your projects
        </span>
        <button onClick={logout} className="flex gap-3">
          <FiLogOut className="w-6 h-6 " />
          Logout
        </button>
      </div>

      <ProjectsList editProjects={true} projects={projectsList} />
    </main>
  );
}

export const getServerSideProps = async () => {
  const snapshot = await getDocs(collection(db, "projects"));
  const projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    props: { projects },
  };
};
