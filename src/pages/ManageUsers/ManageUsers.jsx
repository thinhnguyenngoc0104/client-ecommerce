import './ManageUsers.css'
import UserForm from "../../components/UserForm/UserForm.jsx";
import UserList from "../../components/UserList/UserList.jsx";

const ManageUsers = () => {
    return (
        <div className="container-fluid bg-black users-container text-light">
            <div className="row h-100">
                <div className="col-md-8 ps-4 pt-4 pb-4">
                    <div className="users-border h-100 p-4">
                        <UserForm/>
                    </div>
                </div>
                <div className="col-md-4 p-4">
                    <div className="users-border h-100 p-4 flex-column">
                        <UserList/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ManageUsers;