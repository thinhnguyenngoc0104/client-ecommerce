import Menubar from "./components/Menubar/Menubar.jsx";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import ManageCategories from "./pages/ManageCategories/ManageCategories.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import {Toaster} from "react-hot-toast";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

const App = () => {
    const location = useLocation();

    const LoginRoute = ({element}) => {
        if (localStorage.getItem("token")) {
            return <Navigate to="/dashboard" replace/>
        }
        return element;
    }

    const ProtectedRoute = ({element, allowedRoles}) => {
        if (!localStorage.getItem("token")) {
            return <Navigate to="/login" replace/>
        }

        if (allowedRoles && !allowedRoles.includes(localStorage.getItem("role"))) {
            return <Navigate to="/dashboard" replace/>
        }

        return element
    }

    return (
        <div>
            {location.pathname !== "/login" && <Menubar/>}
            <Toaster/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/explore" element={<Explore/>}/>

                <Route path="/categories"
                       element={<ProtectedRoute element={<ManageCategories/>} allowedRoles={['ROLE_ADMIN']}/>}/>
                <Route path="/items"
                       element={<ProtectedRoute element={<ManageItems/>} allowedRoles={['ROLE_ADMIN']}/>}/>
                <Route path="/users"
                       element={<ProtectedRoute element={<ManageUsers/>} allowedRoles={['ROLE_ADMIN']}/>}/>

                <Route path="/login" element={<LoginRoute element={<Login/>}/>}/>
                <Route path="/orders" element={<OrderHistory/>}/>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </div>
    )
}

export default App
