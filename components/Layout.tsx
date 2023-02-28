import { db } from "@/firebase";
import {
  collection,
  DocumentData,
  onSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Header from "./Header";
import Loader from "./Loader";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [userData, setUserData] =
    useState<QueryDocumentSnapshot<DocumentData>>();

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) =>
      setUserData(snapshot.docs[0])
    );
  }, []);

  if (!userData) {
    return <Loader />;
  } else
    return (
      <>
        <Header profilePic={userData?.data().profilePic} />
        <main>{children}</main>
      </>
    );
}
