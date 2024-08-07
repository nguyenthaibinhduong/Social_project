import { Link} from "react-router-dom";
import './friend.css'
function Friend({ user }) {
    
    return (<>
        <Link to={"/profile/"+user.id} className="w-100 d-flex justify-content-start py-2 ps-2 friend-link">
            <img src={"../upload/" + user.profile_image} className="rounded-circle" alt="User" width="30" height="30" />
            <span className="ms-2"><p>{ user.name }</p></span>
        </Link>
    </>);
}

export default Friend;