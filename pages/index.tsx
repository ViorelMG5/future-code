import Head from "next/head";
import ProjectsList from "@/components/ProjectsList";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  projectVisible: string;
}

export default function Home() {
  const [projectsList, setProjectsList] = useState<Project[]>([]);

  // Usign useEffect to get project list as soon as app runs
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "projects"), (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        projectVisible: doc.data().projectVisible,
        ...doc.data(),
      }));
      // Filter projects based on user preference
      const filteredProjects = projectsData.filter(
        (project) => project.projectVisible !== "no"
      );
      setProjectsList(filteredProjects);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Future Code</title>
        <meta name="description" content="Welcome to Future Code!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-28 px-4  container mx-auto">
        <ProjectsList editProjects={false} projects={projectsList} />
      </main>
    </>
  );
}
