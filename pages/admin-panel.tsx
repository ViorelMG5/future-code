import ProjectsList from "@/components/ProjectsList";
import { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { collection, onSnapshot } from "firebase/firestore";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

export default function AdminPanel() {
  const router = useRouter();
  const [projectsList, setProjectsList] = useState<{ id: string }[]>([]);
  const { user, logout } = useAuth();

  // Get projects list as soon the component render
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

  // Making sure that user is not null on this page
  if (!user) {
    router.push("/admin");
  }

  return (
    <>
      <Head>
        <title>Future Code | Admin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto pt-28 px-4">
        <div className="flex md:items-center flex-col md:flex-row gap-4 py-4 px-2 my-4 md:px-10 justify-between rounded-xl bg-blue-100">
          <span className="text-xl ">
            Welcome Back! Here is where you can edit/delete your projects
          </span>
          <button onClick={logout} className="flex gap-3">
            <FiLogOut className="w-6 h-6 " />
            Logout
          </button>
        </div>

        <ProjectsList editProjects={true} projects={projectsList} />
      </main>
    </>
  );
}
