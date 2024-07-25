import { useMutation } from "@apollo/client"
import { FaTrash } from "react-icons/fa"
import { GET_PROJECTS } from "../queries/ProjectQueries"
import { useNavigate } from "react-router-dom"
import { DELETE_PROJECT } from "../mutations/projectMutations"

export default function ProjectDeleteButton({pid}) {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT , {
        variables: {id: pid},
        onCompleted: ()=> navigate('/'),
        refetchQueries : [{ query:  GET_PROJECTS }]
    })
  return (
    <div className="d-flex mt-5 ms-auto">
        <button className="btn btn-danger m2" onClick={deleteProject}>
            <FaTrash /> 
            Delete Project
        </button>
    </div>
  )
}
