import Menubar from "./components/Menubar/Menubar.jsx";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Explore from "./pages/Explore/Explore.jsx";
import ManageCategories from "./pages/ManageCategories/ManageCategories.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import {Toaster} from "react-hot-toast";

const App = () => {
    return (
        <div>
            <Menubar/>
            <Toaster/>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/explore" element={<Explore/>}/>
                <Route path="/categories" element={<ManageCategories/>}/>
                <Route path="/items" element={<ManageItems/>}/>
                <Route path="/users" element={<ManageUsers/>}/>
            </Routes>
        </div>
    )
}

export default App
