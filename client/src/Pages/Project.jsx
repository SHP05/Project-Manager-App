import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/ProjectQueries";
import Spinner from "../Components/Spinner";
import ClientInfo from "../Components/ClientInfo";
import ProjectDeleteButton from "../Components/ProjectDeleteButton";
import EditProjectModel from "../Components/EditProjectModel";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return <h1>Something Went Wrong !</h1>;
  return (
    <>
        {!loading && !error && 
        (<div className="mx-auto card w-75 p-5 mb-5">
            <Link to={"/"} className="btn btn-light d-inline w-25 ms-auto">Back</Link>
            <h1>{data.project.name}</h1>
            <p>{data.project.description}</p>
            <h5>Project Status</h5>
            <p>{data.project.status}</p>
            <ClientInfo info={data.project.client} />
            <ProjectDeleteButton pid={data.project.id}/>
            <EditProjectModel project={data.project}/>
        </div>)
        }
    </>
  );
}
