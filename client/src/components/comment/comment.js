import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import moment from "moment";
function Comment({ comment,handleDelete }) {
    const { currentUser } = useContext(AuthContext);
    const [showmenu, setshowmenu] = useState(false);
    
    return ( 
        <>
             <div  className='row py-1'>
                                        <div className='col-1 px-2'>
                                            <img src={"../upload/"+comment.profile_image} className="rounded-circle" alt="User" width="40" />
                                        </div>
                                        <div className='col-8'>
                                            <p ><Link to={"/profile/"+comment.user_id} className="fw-bolder">{comment.name}</Link> - {moment(comment.created_at).fromNow()}</p>
                                            <p>{comment.description}</p>
                                            
                                        </div>
                                        {((comment.user_id)==currentUser.id) &&
                                        <div className='col-3 d-flex justify-content-end'>
                                            <button onClick={()=>setshowmenu(!showmenu)} className='btn post-btn'><i class="bi bi-three-dots"></i></button>
                                            {showmenu &&
                                            <button onClick={()=>handleDelete(comment.id)} className='btn post-btn'>Delete</button>}
                                        </div>
                                        }
            </div>
        </>
     );
}

export default Comment;