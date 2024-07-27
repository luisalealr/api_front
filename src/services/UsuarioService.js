import axios from "axios";
import { API_URL } from "../config";

export async function login(nombre, password) {
    try {
        const response = await axios.post(`${API_URL}/signin`, { 
            nombre, 
            clave: password 
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export function logout() {
    localStorage.removeItem('authToken');
}
