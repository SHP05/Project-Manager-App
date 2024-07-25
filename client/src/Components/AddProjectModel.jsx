import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { GET_CLIENTS } from "../queries/ClientQuery";
import { ADD_PROJECT } from "../mutations/projectMutations";

export default function AddProjectModel() {
  const [name, setName] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("new");
  const [clientId, setClientId] = useState("");

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const OnSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || status === "" ) {
      return alert("Please fill All Fields");
    }

    addProject(name ,status , description , clientId);

    setName("");
    setdescription("");
    setstatus("new");
    setClientId("");
  };

//   Add Project
  const [addProject] = useMutation(ADD_PROJECT,{
    variables: { name , description ,  status , clientId },
    update(cache , { data: { addProject }}){
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
            query: GET_PROJECTS,
            data : {projects : [...projects , addProject]}
        })
    }
  });

  if (loading) return null;
  if (error) return <h1>Something Went Wrong</h1>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModel"
          >
            <div className="d-flex align-items-center ">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>
          <div
            className="modal fade"
            id="addProjectModel"
            aria-labelledby="addClientModelLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModelLabel">
                    Add New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={OnSubmit}>
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
                        <option value="new" selected>Not Started</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="clientID">Select Client</label>
                        <select className="form-select" id="clientId" value={clientId} onChange={(e)=> setClientId(e.target.value)}>
                            <option value="">Select Client</option>
                            {
                                data.clients.map((client)=>(
                                    <option key={client.id} value={client.id}>
                                        {client.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Add Project
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
