import axios from "axios";
import API_BASE_URL from "../constant/Constant.js";

export const fetchDashboard = async () => {
    try {
        return await axios.get(API_BASE_URL + '/dashboard', {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}});
    } catch (error) {
        console.error("Fetch dashboard error: ", error);
        return null;
    }
};