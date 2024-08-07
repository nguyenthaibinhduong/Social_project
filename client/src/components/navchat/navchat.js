import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";

function NavChat() {
    const {isPending, isError, data} = useQuery({
    	queryKey: ['listroom'],
		queryFn: () => makeRequest.get('/messages/r/list').then(res => {
		    return res.data;
		}),
    })
    
    return (<>
        <div className="chat-nav">
            <h4 className="chat-nav-title text-center pt-2">List Messages</h4>
            <div className="px-2 chat-nav-content">
                {isError?"Somthing went wrong !":(isPending?"Loading...":data.map((room) => (
                    <UserInfo key={room.id} room={room} />
                )))}
                
            </div>
        </div>
    </>);
}
function UserInfo({ room }) {
    const truncatedString = (str, length) => {
        if (!str) return "No messages yet"; // Xử lý trường hợp chuỗi null hoặc undefined
        str = str.toString();
        if (str.length <= length) {
            return str;
        }
        return str.slice(0, length) + '...'; 
    };
    return (
        <>
            <Link  to={'/chat/'+room.room_id}  className="w-100 d-flex align-items-center py-2 px-1 friend-link ">
                        <img src={"../upload/"+room.user_profile_image} className="rounded-circle" alt="User" width="40" height="40" />
                        <span className="ms-2"><p className="fw-bolder">{ room.user_name }</p><p>{truncatedString(room.latest_message,30)}</p></span>       
            </Link>
        </>
    )
}
export default NavChat;