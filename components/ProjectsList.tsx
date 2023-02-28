import useLocalStorage from "@/hooks/useLocalStorage";
import { Project } from "@/typings";
import { BsFillGrid3X3GapFill, BsListStars } from "react-icons/bs";
import ProjectCard from "./ProjectCard";

interface Props {
  projects: Project[];
  editProjects: boolean;
}

export default function ProjectsList({ projects, editProjects }: Props) {
  const [layoutMode, setLayoutMode] = useLocalStorage(
    "project-view-type",
    "grid-layout"
  );

  return (
    <div>
      <div className="flex justify-between items-center py-2 mb-2">
        <h1 className="text-xl">Projects</h1>
        {layoutMode === "grid-layout" ? (
          <button onClick={() => setLayoutMode("list")}>
            <BsListStars className="w-6 h-6" />
          </button>
        ) : (
          <button onClick={() => setLayoutMode("grid-layout")}>
            <BsFillGrid3X3GapFill className="w-6 h-6" />
          </button>
        )}
      </div>
      <div className={layoutMode === "grid-layout" ? "grid-layout" : "list"}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              editProjects={editProjects}
              project={project}
              key={project.id}
              layoutMode={layoutMode}
            />
          ))
        ) : (
          <p>No Projects Yet</p>
        )}
      </div>
    </div>
  );
}
