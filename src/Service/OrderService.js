import axios from 'axios';
import API_BASE_URL from "../constant/Constant.js";

export const addOrder = async (order) => {
    try {
        return await axios.post(API_BASE_URL + '/orders', order, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Add order error:", error);
        return null;
    }
};

export const deleteOrder = async (orderId) => {
    try {
        return await axios.delete(API_BASE_URL + `/orders/${orderId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Delete order error:", error);
        return null;
    }
};

export const fetchLastestOrders = async () => {
    try {
        return await axios.get(API_BASE_URL + '/orders/latest', {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Fetch order error: ", error);
        return null;
    }
};