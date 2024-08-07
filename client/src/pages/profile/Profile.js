import './profile.css'
import Posts from "../../components/posts/posts";
import Update from "../../components/update/update";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import ScrollToTop from '../../components/scrolltop/scrolltop';
import Info from '../../components/info/info';
function Profile() {
    // Lay User hien tai 
    const { currentUser } = useContext(AuthContext);
    // Lau user_id tu URL
    const user_id = parseInt(useLocation().pathname.split("/")[2]);
    // Lay thong tin user
    const { isPending, isError, data} = useQuery({
        queryKey: ['user',user_id],
        queryFn: () => makeRequest.get('/users/find/' + user_id ).then(res => {
            return res.data;
        }),
    });

    return (<>
        {isPending ? (
            ""
        ) : (
                <>
                    <ScrollToTop />
                    <Info data={data} />
                    <Posts user_id={data.id} />
                </>
        )}
        
    </>);
    
}

export default Profile;