import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

function Leftbar() {
    const { currentUser,logout } = useContext(AuthContext);
    const { isPending, isError, data:user} = useQuery({
        queryKey: ['currentuser'],
        queryFn: () => makeRequest.get('/users/find/' + currentUser.id ).then(res => {
            return res.data;
        }),
    });
    return ( 
        <div className="card">
           <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Friend</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">Active</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Friend</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            
        </div>
     );
}

export default Leftbar;