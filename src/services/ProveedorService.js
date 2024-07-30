import axios from "axios";
import { API_URL } from "../config";

export async function getAllProveedores() {
    try {
        const result = await axios.get(`${API_URL}/provider/`, {
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
export async function getProveedorPorId(id) {
    try {
        const result = await axios.get(`${API_URL}/provider/` + id, {
            headers: {
                'Content-Type': 'aplication/json'
            }
        });
        const data = await result.data;
        console.log(data)
        return data
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        return null;
    }
}


export async function disableProveedor(id) {
    try {
        await axios.put(`${API_URL}/categories/${id}`, {
            isActive: 0
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error al deshabilitar la categoría:', error);
        throw error; // Lanzar el error para manejarlo en el componente
    }
}

