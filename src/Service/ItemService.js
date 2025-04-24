import axios from 'axios';
import API_BASE_URL from "../constant/Constant.js";

export const addItem = async (item) => {
    try {
        return await axios.post(API_BASE_URL + '/admin/items', item, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Add item error:", error);
        return null;
    }
};

export const deleteItem = async (itemId) => {
    try {
        return await axios.delete(API_BASE_URL + `/admin/items/${itemId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Delete item error:", error);
        return null;
    }
};

export const fetchItems = async () => {
    try {
        return await axios.get(API_BASE_URL + '/items', {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Fetch items error: ", error);
        return null;
    }
};