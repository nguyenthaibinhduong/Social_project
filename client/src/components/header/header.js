import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {
    useQuery
} from '@tanstack/react-query';
import { makeRequest } from '../../axios';
function Header() {
	const { currentUser,logout } = useContext(AuthContext);
	const navigate = useNavigate() 
	const handleLogout = async () => {
		try { 
			await logout();
			navigate("/login");
		} catch (error) {
			console.log(error.response.data);
		}

	}
	const { isPending, isError, data:user} = useQuery({
        queryKey: ['currentuser'],
        queryFn: () => makeRequest.get('/users/find/' + currentUser.id ).then(res => {
            return res.data;
        }),
    });
	const [inputs, setInputs] = useState({
		keyword:""
	});
	var handleChange = e => {
        setInputs(prev=>({...prev, [e.target.name]: e.target.value }));
	}
	
	const handleSearch = (key) => {
		//window.location.href ="/search/"+key;
		navigate("/search/"+key);
	}
	return ( 
	<>
			 {isPending ? (
            ""
        ) : (
                <>
                  <div className="page-header w-100 px-5 pt-4">

					<div className="toggle-sidebar" id="toggle-sidebar"><i className="bi bi-list"></i></div>

					
					<ol className="breadcrumb d-md-flex d-none">
						<li className="breadcrumb-item">
							<Link to="/"><i className="bi bi-house"></i></Link>
						</li>

					</ol>
		
					<div className="header-actions-container">

						
						<div className="search-container">

							
							<div className="input-group">
								<input onChange={handleChange} name="keyword" type="text" className="form-control bg-light " placeholder="Search anything" />
								<button onClick={()=>handleSearch(inputs.keyword)} className="btn" type="button">
									<i className="bi bi-search"></i>
								</button>
							</div>
					

						</div>
	
						<a href="orders.html" className="leads d-none d-xl-flex">
							<div className="lead-details">You have <span className="count"> 21 </span> new leads </div>
							<span className="lead-icon"><i
									className="bi bi-bell-fill animate__animated animate__swing animate__infinite infinite"></i><b
									className="dot animate__animated animate__heartBeat animate__infinite"></b></span>
						</a>
						
						<ul className="header-actions">
							<li className="dropdown">
								<a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
                            <span className="user-name d-none d-md-block">{ user.name }</span>
									<span className="avatar">
										<img src={ "../upload/"+user.profile_image } alt="Admin Templates" />
										<span className="status online"></span>
									</span>
								</a>
								<div className="dropdown-menu dropdown-menu-end" aria-labelledby="userSettings">
									<div className="header-profile-actions">
										<Link to={"/profile/"+user.id}>Profile</Link>
										<a href="#" onClick={handleLogout}>Logout</a >
									</div>
								</div>
							</li>
                        </ul>

					</div>


				</div> 
                </>
        )}
	</>
		
        		
     );
}

export default Header;