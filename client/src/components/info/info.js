import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './info.css';
import { makeRequest } from '../../axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../update/update';
function Info({ data }) {
    const { currentUser } = useContext(AuthContext);
    // Get follower_user_id
    const { isPending:rPending, isError:rError, data:rData} = useQuery({
        queryKey: ['relationships'],
        queryFn: () => makeRequest.get('/relationships?followed_user_id=' + data.id ).then(res => {
            return res.data;
        }),
    });
    //Add follow
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (followed) => {
            if(followed) return makeRequest.delete('/relationships?user_id='+data.id)
            return makeRequest.post('/relationships?user_id='+data.id);
        },
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['relationships'] })
        },
    });
    const handleFollow = () => {
        mutation.mutate(rData.includes(currentUser.id));
    }
    // open Update model 
    const [showUpdate, setShowUpdate] = useState(false);
    const handleUpdate = () => {
        setShowUpdate(!showUpdate);
    }
    return (<>
                <div className="row images">
                        <img src={'../upload/'+ data.cover_image} alt="" className="cover-img" />
                        <img src={'../upload/'+ data.profile_image} alt="" className="profile-img" />
                    </div>
                    <div className="row profile-info mb-3">
                        <div className="col-2 d-flex justify-content-start align-items-end">
                        
                        </div>
                        <div className="col-8 center-profile">
                            <h1 className="text-center fs-1">{data.name}</h1>
                            {(data.id == currentUser.id) ?
                                (<div className='d-flex justify-content-center'><button onClick={handleUpdate} className='btn btn-secondary'>Update</button></div>)
                                 :((rPending) ?
                                    ("...")
                                    :((rData.includes(currentUser.id)) ?
                                        (<div className='d-flex justify-content-center'><button onClick={handleFollow} className='btn btn-secondary'>Followed</button></div>) 
                                        :(<div className='d-flex justify-content-center'><button onClick={handleFollow} className='btn btn-secondary'>Follow</button></div>)
                                    )
                                )}
                        </div>
                        <div className="col-2 d-flex justify-content-end align-items-start pt-3">
                            <button className="btn px-1"><i className='bi bi-chat-text'></i></button>
                            <button className="btn px-1"><i className='bi bi-three-dots-vertical'></i></button>
                        </div>
        </div>
        {showUpdate && <Update setShowUpdate={setShowUpdate} user={data} />}
    </>);
}

export default Info;