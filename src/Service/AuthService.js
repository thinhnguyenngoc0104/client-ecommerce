import axios from "axios";
import API_BASE_URL from "../constant/Constant.js";

export const login = async (data) => {
    try {
        return await axios.post(API_BASE_URL + "/login", data);
    } catch (error) {
        console.error("Login error:", error);
        return null;
    }
}