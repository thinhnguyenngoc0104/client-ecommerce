import './Menubar.css'
import {assets} from "../../assets/assets.js";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../context/AppContext.jsx";

const Menubar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {setAuthData, auth} = useContext(AppContext);
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const isAdmin = localStorage.getItem("role");

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
            <a className="navbar-brand" href="#">
                <img src={assets.logo} alt="Logo" height="40"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2" id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/dashboard') ? 'fw-bold text-warning' : ''}`}
                              to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/explore') ? 'fw-bold text-warning' : ''}`}
                              to="/explore">Explore</Link>
                    </li>
                    {
                        isAdmin === "ROLE_ADMIN" && (
                            <>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/items') ? 'fw-bold text-warning' : ''}`}
                                          to="/items">Manage Items</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/categories') ? 'fw-bold text-warning' : ''}`}
                                          to="/categories">Manage Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${isActive('/users') ? 'fw-bold text-warning' : ''}`}
                                          to="/users">Manage Users</Link>
                                </li>
                            </>
                        )
                    }
                    <li className="nav-item">
                        <Link className={`nav-link ${isActive('/orders') ? 'fw-bold text-warning' : ''}`} to="/users">Order
                            History</Link>
                    </li>
                </ul>
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdown-container"
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={assets.userProfile} alt="Logo" height={32} width={32}/>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdown-container">
                        <li><a className="dropdown-item" href="#!">Settings</a></li>
                        <li><a className="dropdown-item" href="#!">Activity Logs</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#!" onClick={logout}>Log out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menubar