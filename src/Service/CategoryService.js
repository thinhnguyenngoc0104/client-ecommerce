import axios from 'axios';

export const addCategory = async (category) => {
    try {
        return await axios.post('http://localhost:8080/api/v1.0/categories', category);
    } catch (error) {
        console.error("Add category error:", error);
        return null;
    }
};

export const deleteCategory = async (categoryId) => {
    try {
        return await axios.delete(`http://localhost:8080/api/v1.0/categories/${categoryId}`);
    } catch (error) {
        console.error("Delete category error:", error);
        return null;
    }
};

export const fetchCategories = async () => {
    try {
        return await axios.get('http://localhost:8080/api/v1.0/categories');
    } catch (error) {
        console.error("Fetch categories error: ", error);
        return null;
    }
};