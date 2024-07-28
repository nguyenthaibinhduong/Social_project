import { AuthContext } from '../../context/authContext';
import { useContext,useState } from "react";
import {
    useMutation,
    useQueryClient,
    useQuery
} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
 import moment from "moment";
function Comments({ post_id }) {
    //get current user
    const { currentUser } = useContext(AuthContext);
    //get comments
    const {isPending, isError, data } = useQuery({
    	queryKey: ['comments'],
		queryFn: () => makeRequest.get('/comments?post_id='+post_id).then(res => {
            
            return res.data; 
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
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        },
    });
    const handleClick = async(e) => {
        e.preventDefault();
        mutation.mutate({description,post_id: post_id});
        setDescription("");
    }
    
    return ( 
        <>
            <div className='border-1 border-top py-2'>
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
                                {isError?"Somthing went wrong !":(isPending?"Loading...":data.map((comment) => (
                                    <div key={comment.id} className='row py-1'>
                                        <div className='col-1 px-2'>
                                            <img src={"../upload/"+comment.profile_image} className="rounded-circle" alt="User" width="40" />
                                        </div>
                                        <div className='col-8'>
                                            <p className="fw-bolder">{ comment.name}</p>
                                            <p>{ comment.description}</p>
                                        </div>
                                        <div className='col-3'>
                                            <p>{moment(comment.created_at).fromNow()}</p>
                                        </div>
                                    </div>
                                )))}
                                

            </div>
        </>
     );
}

export default Comments;