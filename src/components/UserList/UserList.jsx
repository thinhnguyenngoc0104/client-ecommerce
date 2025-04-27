import {useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import {deleteUser} from "../../Service/UserService.js";

const UserList = ({users, setUsers}) => {
    const [search, setSearch] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    )


    const deleteByUserId = async (userId) => {
        try {
            const response = await deleteUser(userId);
            if (response.status === 204) {
                const postRemoval = users.filter(user => user.userId !== userId);
                setUsers(postRemoval);
                toast.success("User deleted successfully.");
            } else {
                toast.error("Unable to delete user.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Unable to delete user.");
        }
    }

    return (
        <div className="user-list-container overflow-y-auto overflow-x-hidden h-100 text-light">
            <div className="row pe-2">
                <div className="input-group mb-1">
                    <input type="text"
                           name="keyword"
                           id="keyword"
                           className="form-control"
                           placeholder="Search..."
                           onChange={(e) => setSearch(e.target.value)}
                           value={search}/>
                    <span className="input-group-text bg-warning">
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
            <div className="row pe-2">
                {filteredUsers.map((user, index) => (
                    <div key={index} className="col-md-12 mt-3">
                        <div className="card p-3 bg-dark">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-light">{user.name}</h5>
                                    <p className="mb-0 text-light">{user.email}</p>
                                </div>
                                <div>
                                    <button className="btn btn-danger btn-sm"
                                            type="button"
                                            onClick={() => deleteByUserId(user.categoryId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserList;