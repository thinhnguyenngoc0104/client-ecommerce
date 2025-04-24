import axios from 'axios';
import API_BASE_URL from "../constant/Constant.js";

export const addCategory = async (category) => {
    try {
        return await axios.post(API_BASE_URL + '/admin/categories', category, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Add category error:", error);
        return null;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        return await axios.delete(API_BASE_URL + `/admin/categories/${categoryId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Delete category error:", error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        return await axios.get(API_BASE_URL + '/categories', {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Fetch categories error: ", error);
        return null;
    }
};