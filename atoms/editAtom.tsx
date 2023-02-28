import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";

export const editProjects = atom({
  key: "modalState",
  default: false,
});
