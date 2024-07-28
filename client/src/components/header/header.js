import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
function Header() {
	const { currentUser } = useContext(AuthContext);
	const logout = () => {
		localStorage.clear();
		document.cookie = 'access_token=; Max-Age=0; path=/;';
        window.location.href = '/login';
    };
    return ( 
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
								<input type="text" className="form-control bg-light" placeholder="Search anything" />
								<button className="btn" type="button">
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
                            <span className="user-name d-none d-md-block">{ currentUser.name }</span>
									<span className="avatar">
										<img src={ "../upload/"+currentUser.profile_image } alt="Admin Templates" />
										<span className="status online"></span>
									</span>
								</a>
								<div className="dropdown-menu dropdown-menu-end" aria-labelledby="userSettings">
									<div className="header-profile-actions">
										<Link to={"/profile/"+currentUser.id}>Profile</Link>
										<a href="account-settings.html">Settings</a>
										<a href="#" onClick={logout}>Logout</a >
									</div>
								</div>
							</li>
                        </ul>

					</div>


				</div>
     );
}

export default Header;