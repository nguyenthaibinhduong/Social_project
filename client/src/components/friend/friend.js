import { Link} from "react-router-dom";
import './friend.css'
import Avatar from "../avatar/avatar";
function Friend({ user , isOnline }) {
    
    return (<>
        <Link to={"/profile/"+user.id} className="w-100 d-flex justify-content-start py-2 ps-2 friend-link">
            <Avatar size={40} profile_image={user.profile_image} isOnline={isOnline} />
            <span className="ms-2"><p>{ user.name }</p></span>
        </Link>
    </>);
}

export default Friend;