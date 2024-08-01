import { AuthContext } from '../../context/authContext';
import { useContext,useEffect,useState } from "react";
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query';
import { makeRequest } from '../../axios';

import './comments.css'
import { Link } from 'react-router-dom';
import Comment from '../comment/comment';
function Comments({ post_id, opencomment,SetnumComments}) {
    //get current user
    const { currentUser } = useContext(AuthContext);
    const [showMore, setShowMore] = useState(true);
    
    //get comments
    const {isPending, isError, data } = useQuery({
    	queryKey: ['comments'+post_id,showMore],
		queryFn: () => makeRequest.get(showMore?('/comments/new?post_id='+post_id):('/comments?post_id='+post_id)).then(res => {
            
            return res.data; 
		}),
    })
    const {isPending:CommentPend, isError:CommentErr, data:comment } = useQuery({
    	queryKey: ['comment-num'+post_id,SetnumComments],
        queryFn: () => makeRequest.get(('/comments?post_id=' + post_id)).then(res => {
            SetnumComments(res.data.length);
            return res.data.length; 
        }),
        
    })
    //created comments
    const [description, setDescription] = useState("");
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (newPost) => {
            return makeRequest.post('/comments', newPost);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comment-num'+post_id,SetnumComments] });
            queryClient.invalidateQueries({ queryKey: ['comments'+post_id] })
        },
    });
    const handleClick = async(e) => {
        e.preventDefault();
        mutation.mutate({description,post_id: post_id});
        setDescription("");
    }
    const deletemutation = useMutation({
        mutationFn: (comment_id) => {
            return makeRequest.delete('/comments/'+comment_id);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['comment-num'+post_id,SetnumComments] });
            queryClient.invalidateQueries({ queryKey: ['comments'+post_id] })
        },
    });
    const handleDelete = async(id) => {
        deletemutation.mutate(id);
    }
    return ( 
        <>
            
            <div className='border-1 border-top py-2'>
                                {comment>2 && 
                    
                               
                                <div className='d-flex justify-content-start'>
                                {!showMore && <button className='btn ps-0 d-flex align-item-center' onClick={()=>setShowMore(true)}><i class="bi bi-caret-up-fill"></i>Hide comments</button>}
                                {showMore && <button className='btn ps-0 d-flex align-item-center' onClick={()=>setShowMore(false)}><i class="bi bi-caret-down-fill"></i>More comments</button>}
                                </div>}
                                {
                                    opencomment &&
                                    
                                
                                <div className="row py-4">
                                    <div className='col-1 px-2'>
                                        <img src={ "../upload/"+currentUser.profile_image } className="rounded-circle" alt="User" width="40" />
                                    </div>
                                    <div className='col-11 d-flex'>
                                        <div className='input-group'>
                                            <input 
                                                onChange={(e) =>setDescription(e.target.value)}
                                                value={description}
                                                type="text"
                                                className='form-control'
                                            />
                                            <button onClick={handleClick} className='btn btn-dark'>Comment</button>
                                        </div>
                                        
                                    </div>
		                        </div>
                                }
                                {isError?"Somthing went wrong !":(isPending?"Loading...":data.map((comment) => (
                                    <Comment key={comment.id} comment={comment} handleDelete={ handleDelete } />
                                )))}  
            </div>
        </>
     );
}

export default Comments;