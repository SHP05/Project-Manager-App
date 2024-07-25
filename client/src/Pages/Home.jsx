import AddClientModel from "../Components/AddClientModel"
import Client from "../Components/Client"
import Project from "../Components/Project"
import AddProjectModel from "../Components/AddProjectModel"

export default function Home() {
  return (
    <>
        <div className="d-flex gap-3 mb-4">
        <AddClientModel />
        <AddProjectModel />
        </div>
        <Project />
        <hr /> 
        <Client />
    </>
  )
}
