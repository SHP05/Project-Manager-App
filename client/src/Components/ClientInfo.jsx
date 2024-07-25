import { FaIdBadge , FaEnvelope , FaPhone } from "react-icons/fa" 

export default function ClientInfo({info}) {
  return (
    <>
        <h5>Client Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaIdBadge className="icon"/> {info.name}
            </li>
            <li className="list-group-item">
                <FaEnvelope className="icon"/> {info.email}
            </li>
            <li className="list-group-item">
                <FaPhone className="icon"/> {info.phone}
            </li>
        </ul>
    </>
  )
}
