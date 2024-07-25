import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/ProjectQueries";
import { useParams } from "react-router-dom";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

export default function EditProjectModel({ project }) {
  const {id} = useParams();

  const [name, setName] = useState(project.name);
  const [description, setdescription] = useState(project.description);
  const [status, setstatus] = useState("new");

  const [updateProject] = useMutation(UPDATE_PROJECT,{
    variables: {id: project.id , name , description ,status},
    refetchQueries: [{query: GET_PROJECT , variables: {id: project.id}}]
  })

  const onSubmit = (e) =>{
    e.preventDefault();

    if(name === "" || description === "" || status === ""){
        return alert("Please fill out all the fields");
    }
    updateProject(name , description , status );
  }
  return (
    <>
      <h3>Update Project Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
          >
            <option value="new">Not Started</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-primary"
        >
          Update Project Details
        </button>
      </form>
    </>
  );
}
