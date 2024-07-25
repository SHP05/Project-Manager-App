import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

export default function Project() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  console.log(data);
  if (loading) return <Spinner />;
  if (error) return <p>Somthing went wrong.....</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="d-flex raw mt-4 flex-wrap">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
