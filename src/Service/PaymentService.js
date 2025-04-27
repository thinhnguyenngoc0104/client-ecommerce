import axios from 'axios';
import API_BASE_URL from "../constant/Constant.js";

export const addCharge = async (data) => {
    try {
        return await axios.post(API_BASE_URL + '/payments/create-charge', data, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Add stripe charge error:", error);
        return null;
    }
};

export const verifyCharge = async (data) => {
    try {
        return await axios.post(API_BASE_URL + '/payments/verify', data, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Verify stripe charge error:", error);
        return null;
    }
};