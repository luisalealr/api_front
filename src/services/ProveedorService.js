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

export const getProveedorPorId = async (id) => {
    try {
        const result = await axios.get(`${API_URL}/provider/`);
        const data = await result.data;
        // Buscar el proveedor por ID
        const proveedor = data.find(p => p.id_proveedor === parseInt(id));
        return proveedor ? proveedor : null; // Retornar el proveedor si existe
    } catch (error) {
        console.error('Error al obtener el proveedor:', error);
        return null;
    }
};

export async function updateProveedorTelefono(id, telefono) {
    try {
        await axios.put(`${API_URL}/provider/${id}`, { telefono });
    } catch (error) {
        console.error('Error al actualizar el teléfono del proveedor:', error);
        throw error;
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

