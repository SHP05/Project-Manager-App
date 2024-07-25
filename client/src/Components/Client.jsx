import { useQuery } from "@apollo/client";
import ClientRaw from "./ClientRaw";
import { GET_CLIENTS } from "../queries/ClientQuery";
import Spinner from "./Spinner";

export default function Client() {
  const { loading , error , data } = useQuery(GET_CLIENTS);
  
  if(loading) return <Spinner />;
  if(error) return <p>Somthing went wrong</p>
  console.log(data);
  return (
    <>
        {!loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.clients.map(client => (
                            <ClientRaw key={client.id} client={client}/>
                        ))
                    }
                </tbody>
            </table>
        )
        }
    </>
  )
}
