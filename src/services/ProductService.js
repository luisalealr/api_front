import { API_URL } from "../config";
import axios from "axios";

export async function getProducts() {
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

export async function getProduct(id) {
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

export async function crearProduct(){
    try{
        const result = await axios.post(`${API_URL}/products/`, {
            method: 'POST',
            body: data,
        });
    const data = await result.data;
    console.log(data)
    return data
    } catch (error) {
        console.error('Error:', error);
        return null
    }
}