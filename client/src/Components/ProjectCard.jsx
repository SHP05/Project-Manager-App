
export default function ProjectCard({ project }) {
  return (
    <div className="col-md-3 mx-2">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-item-center">
            <h5 className="card-title">{project.name}</h5>

            <a className="btn btn-light" href={`/project/${project.id}`}>
              View
            </a>
          </div>
          <p>
            Status : <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
