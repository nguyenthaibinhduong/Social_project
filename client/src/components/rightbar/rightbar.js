import { useQuery } from "@tanstack/react-query";
import Friend from "../friend/friend";
import { makeRequest } from "../../axios";
import './rightbar.css'
import io from 'socket.io-client';
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect, useState } from "react";

function Rightbar() {

	const { isPending, isError, data} = useQuery({
        queryKey: ['friend'],
        queryFn: () => makeRequest.get('/users/friends').then(res => {
            return res.data;
        }),
	});
	
    return ( 
        <>
            <div className="row">
                <div className="card">
					<div className="card-header">
						<div className="card-title">Card Title</div>
					</div>
					<div className="card-body">
		
						

					</div>
				</div>
            </div>
            <div className="row">
                <div className="card px-0">
					<div className="card-header">
						<div className="card-title">Your Friends</div>
					</div>
					<div className="card-body">
						{isError?"Somthing went wrong !":(isPending?"Loading...":data.map((user) => (
							<Friend key={user.id} user={user} />
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
						<p className="mb-2">Some quick example text to build on the card title and make up the bulk of the
							card's content.</p>
					</div>
				</div>
            </div>
        </>
     );
}

export default Rightbar;