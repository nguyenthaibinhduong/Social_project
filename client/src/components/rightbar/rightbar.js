import { useQuery } from "@tanstack/react-query";
import Friend from "../friend/friend";
import { makeRequest } from "../../axios";
import './rightbar.css'
import { useSocket } from "../../context/socketContext";
import { useUser } from "../../context/userContext";

function Rightbar() {

	const { isPending, isError, data} = useQuery({
        queryKey: ['friend'],
        queryFn: () => makeRequest.get('/users/friends').then(res => {
            return res.data;
        }),
	});
	const { onlineUsers, isPending: Upend, isError: Uerror } = useSocket();
	const { CurrentUser} = useUser();
    return ( 
        <>
            <div className="row">
                <div className="card px-0">
					<div className="card-header">
						<div className="card-title">Your Friends</div>
					</div>
					<div className="card-body">
						{isError?"Somthing went wrong !":(isPending?"Loading...":data.map((user) => (
							<Friend key={user.id} user={user} isOnline={onlineUsers.some((userS) => userS.userId === user.id)} />
						)))}
					</div>
				</div>
            </div>
            <div className="row">
                <div className="card">
					<div className="card-header">
						<div className="card-title">Online chat</div>
					</div>
					<div className="card-body">
						{Uerror?"Some thing went wrong !":
							Upend ? "Loading..." : 
								onlineUsers && onlineUsers.length > 1 ?
								onlineUsers.map((user) => (
                                (user.userId!== CurrentUser.id) && <UserOnline key={user.userId} user_id={user.userId} />
								)) :
									("No users online !")
						}
					</div>
				</div>
            </div>
        </>
     );
}
function UserOnline({user_id}) {
	const { isPending, data } = useQuery({
		queryKey: ['user', user_id],
        queryFn: () => makeRequest.get('/users/find/'+user_id).then(res => {
            return res.data;
        }),
	})
	
	return (
		<>
			{ isPending ? "..." : <Friend size={ 40 } user={data} isOnline={true} />}
        </>
	)
}

export default Rightbar;