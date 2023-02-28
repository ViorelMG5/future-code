import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { BsGlobe } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import useProjectUtility from "@/hooks/useProjectUtility";
import AddProjectModal from "./AddProjectModal";
interface Props {
  layoutMode: string;
  project: DocumentData;
  editProjects: boolean;
}

export default function ProjectCard({
  layoutMode,
  project,
  editProjects,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { deleteProject } = useProjectUtility();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await deleteProject(project.id);
    }
  };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`card rounded-xl relative  overflow-hidden ${
        layoutMode === "grid-layout"
          ? "flex flex-col "
          : "list-card max-w-[700px] "
      }`}
    >
      <div
        className={`relative bg-orange-100 shrink-0 ${
          layoutMode === "grid-layout" ? "pt-[62.5%]  " : "flex-1 pt-[20%]"
        }`}
      >
        <Image
          src={project.image}
          alt="demo"
          className="absolute top-0 bottom-0 left-0 w-full h-full object-contain "
          width={500}
          height={500}
        />
      </div>

      <div
        className={` p-2 border  ${
          layoutMode === "grid-layout"
            ? "justify-between grow"
            : " p-4 lg:px-6 shrink-0 flex-[3] flex flex-col justify-center"
        }`}
      >
        <h2 className="text-xl">{project.title}</h2>
        {project.link && (
          <Link
            href={project.link}
            target="_blank"
            className={`font-medium text-orange-500 flex items-center gap-2 ${
              editProjects ? "pointer-events-none" : ""
            }`}
          >
            Visit Website
            <BsGlobe />
          </Link>
        )}
      </div>
      {editProjects && isHovered && (
        <div className="absolute bg-[#000000]/50 w-full h-full grid place-content-center z-10">
          <div className="flex items-center gap-4">
            <AddProjectModal editProjects={true} project={project} />
            <FaTrash
              onClick={handleDelete}
              className="w-5 h-5 text-white cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
  );
}
