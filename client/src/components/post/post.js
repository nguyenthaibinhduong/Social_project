import { AuthContext } from '../../context/authContext';
import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import Comments from '../comments/comment';
import './post.css'
import moment from "moment";
import {  useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
function Post({ post }) {
    //open comment effect
    const [opencomment, Setopencomment] = useState(false);
     //open comment menu
    const [openmenu, Setopenmenu] = useState(false);
    //get current user
    const { currentUser } = useContext(AuthContext);
    //get likes
    const { isPending, isError, data} = useQuery({
        queryKey: ['likes',post.id],
        queryFn: () => makeRequest.get('/likes?post_id=' + post.id).then(res => {
            return res.data;
        }),
    });
    //create and delete likes
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (liked) => {
            if(liked) return makeRequest.delete('/likes?post_id='+post.id)
            return makeRequest.post('/likes?post_id='+post.id);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['likes'] })
        },
    });
    const handleLike = async(e) => {
        e.preventDefault();
        mutation.mutate(data.includes(currentUser.id));
    }
    // delete Post
    const deletemutation = useMutation({
        mutationFn: (post_id) => {
            return makeRequest.delete('/posts/'+post_id);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
    });
    const handleDelete = async() => {
        deletemutation.mutate(post.id);
    }
    return ( 
        <>
            <div className="row">
                <div className="col-12 p-0">
					<div className="card">
                        <div className="card-body">
                            <div className='row mb-3'>
                                <div className='col-1 px-2'>
                                    <Link to={"/profile/"+post.user_id}><img src={'../upload/'+post.profile_image} className="rounded-circle" alt="User" width="50" /></Link>
                                </div>
                                <div className='col-8'>
                                    <Link to={"/profile/"+post.user_id}><span className='fw-bolder text-name'>{post.name}</span></Link>
                                    <p>{ moment(post.created_at).fromNow() }</p>
                                </div>
                                {(post.user_id == currentUser.id) &&
                                    <div className='col-1 offset-2'>
                                        <button onClick={() => Setopenmenu(!openmenu)} className='btn post-btn'><i className='bi bi-three-dots'></i></button>
                                        {openmenu &&
                                            <div className='menu-post'>
                                                <ul class="list-group">
                                                    <a href='' class="list-group-item">An active item</a>
                                                    <button onClick={handleDelete} class="list-group-item text-start">Delete post</button>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                            <p className="mb-2">{post.description}</p>
                            { post.img && <img src={"/upload/" + post.img} className="card-img-bottom" alt="Best Admin Dashboards" />}
                            
                            <div className="d-flex mt-2">
                                <button onClick={handleLike} className='btn ps-0 d-flex align-item-center'>
                                    { isPending ? ("...") :
                                        (data.includes(currentUser.id)) ? (
                                        <i className="bi bi-suit-heart-fill text-danger"></i>
                                    ) : (
                                        <i className="bi bi-suit-heart"></i>
                                    )}
                                    <p className='d-inline ps-1'>{data ? data.length:0} Likes</p>
                                </button>
                                <button onClick={()=>Setopencomment(!opencomment)} className='btn ps-0 d-flex align-item-center'><i className="bi bi-chat "></i><p className='d-inline ps-1'>Comments</p></button>
                                <button className='btn ps-0 d-flex align-item-center'><i className="bi bi-share "></i><p className='d-inline ps-1'>Share</p></button>
                            </div>
                            {opencomment && <Comments post_id={post.id} />}
                            
						</div>

					</div>
			    </div>
            </div>
        </>
     );
}

export default Post;
