import axios from "axios";
import { API_URL } from "../config";

export async function getAllCategorias() {
    try {
        const result = await axios.get(`${API_URL}/categories/`, {
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
export async function getCategoriaPorId(id) {
    try {
        const result = await axios.get(`${API_URL}/categories/`);
        const data = await result.data;

        // Buscar la categoría por ID
        const categoria = data.find(c => c.id_categoria === parseInt(id));
        return categoria ? categoria : null; // Retornar la categoría si existe
    } catch (error) {
        console.error('Error al obtener la categoría:', error);
        return null;
    }
}


export async function disableCategoria(id) {
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

