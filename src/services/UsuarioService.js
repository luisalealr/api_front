import axios from "axios";
import { API_URL } from "../config";

export async function login(nombre, password) {
    try {
        const response = await axios.post(`${API_URL}/signin`, {
            nombre,
            clave: password
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            // El servidor respondió con un estado fuera del rango 2xx
            return { error: error.response.data.message || 'Credenciales incorrectas' };
        } else if (error.request) {
            // La solicitud se realizó pero no se recibió respuesta
            return { error: 'No se recibió respuesta del servidor' };
        } else {
            // Algo pasó al configurar la solicitud
            return { error: 'Error al realizar la solicitud' };
        }
    }
}

export function logoutApi() {
    localStorage.removeItem('authToken');
}
