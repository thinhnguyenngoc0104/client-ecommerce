import axios from 'axios';
import API_BASE_URL from "../constant/Constant.js";

export const addUser = async (item) => {
    try {
        return await axios.post(API_BASE_URL + '/admin/register', item, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Add user error:", error);
        return null;
    }
};

export const deleteUser = async (userId) => {
    try {
        return await axios.delete(API_BASE_URL + `/admin/users/${userId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Delete user error:", error);
        return null;
    }
};

export const fetchUsers = async () => {
    try {
        return await axios.get(API_BASE_URL + '/admin/users', {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Fetch users error: ", error);
        return null;
    }
};