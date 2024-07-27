import axios from "axios";
import { API_URL } from "../config";

export async function crearVenta(){
    try{
        const result = await axios.post(`${API_URL}/buys/`, {
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