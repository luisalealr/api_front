import axios from "axios";
import { API_URL } from "../config";

export async function getAllCategorias() {
    try {
        const result = await axios.get(`${API_URL}/products/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'aplication/json'
            }
        });
        const data = await result.data;
        console.log(data)
        return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}

export async function getCategoria(id) {
    try {
        const result = await axios.get(`${API_URL}/products/product/` + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        const data = await result.data;
        console.log(data)
        return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}