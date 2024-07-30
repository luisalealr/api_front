import { API_URL } from "../config";
import axios from "axios";

export async function getProducts() {
    try {
        const result = await axios.get(`${API_URL}/products/`);
        console.log(result.data)
        return result.data;
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

export async function getCountProducts() {
    try {
        const response = await axios.get(`${API_URL}/products/count`);
        return response.data; // Devuelve el arreglo completo
    } catch (error) {
        console.error('Error al obtener la cantidad de productos:', error);
        throw error;
    }
}

export async function getProductosPorCategoria() {
    try {
        const response = await axios.get(`${API_URL}/products/categories`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos por categorías:', error);
        throw error;
    }
}

export async function getProductByName(nombre) {
    try {
        const result = await axios.get(`${API_URL}/products/search/` + nombre, {
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