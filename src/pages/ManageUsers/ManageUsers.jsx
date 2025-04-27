import './ManageUsers.css'
import UserForm from "../../components/UserForm/UserForm.jsx";
import UserList from "../../components/UserList/UserList.jsx";
import {useEffect, useState} from "react";
import {fetchUsers} from "../../Service/UserService.js";
import toast from "react-hot-toast";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Unable to load users");
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [])

    return (
        <div className="container-fluid bg-black users-container text-light">
            <div className="row h-100">
                <div className="col-md-8 ps-4 pt-4 pb-4">
                    <div className="users-border h-100 p-4">
                        <UserForm setUsers={setUsers} />
                    </div>
                </div>
                <div className="col-md-4 p-4">
                    <div className="users-border h-100 p-4 flex-column">
                        {!loading && (<UserList users={users} setUsers={setUsers} />)}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageUsers;