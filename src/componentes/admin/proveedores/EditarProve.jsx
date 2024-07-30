import { useState, useEffect } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../config";
import { getProveedorPorId, updateProveedorTelefono } from '../../../services/ProveedorService.js'

const EditarProveedor = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const data = await getProveedorPorId(id);
                setNombre(data.nombre);
                setTelefono(data.telefono);
            } catch (error) {
                console.error('Error al obtener el proveedor:', error.response ? error.response.data : error.message);
                toast.error(`Error al obtener el proveedor: ${error.message}`, { autoClose: 1500 });
            }
        };
        fetchProveedor();
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si el campo de teléfono está vacío
        if (telefono.trim() === '') {
            toast.error('El teléfono del proveedor es obligatorio');
            return;
        }

        try {
            await updateProveedorTelefono(id, telefono.trim());
            toast.success('Teléfono del proveedor actualizado correctamente', { autoClose: 1500 });
            navigate('/listar_proveedores', { state: { message: 'Teléfono del proveedor actualizado correctamente' } });
        } catch (error) {
            console.error('Error al actualizar el teléfono del proveedor:', error);
            toast.error('Error al actualizar el teléfono del proveedor: ' + (error.response?.data?.message || error.message), { autoClose: 1500 });
        }
    };

    const handleCancel = () => {
        navigate('/listar_proveedores');
    };

    return (
        <TemplateAdmin>
            <ToastContainer />
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Editar proveedor
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-10 w-full">
                <form onSubmit={handleSubmit} className="w-full mt-10">
                    <div className="mb-4 flex flex-row w-[70%]">
                        <label htmlFor="nombre" className="mr-2 w-48 font-bold">
                            Nombre del proveedor:
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            disabled
                            className="border border-gray-300 p-2 w-[35%] rounded-md bg-gray-200 cursor-not-allowed"
                        />
                    </div>
                    <div className="mb-4 flex flex-row w-[70%]">
                        <label htmlFor="telefono" className="mr-2 w-48 font-bold">
                            Teléfono:
                        </label>
                        <input
                            id="telefono"
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Teléfono del proveedor"
                            className="border border-gray-300 w-[35%] p-2 rounded-md"
                        />
                    </div>
                    <div className="flex m-10">
                        <button
                            type="submit"
                            className="bg-[#8DB600] text-black py-2 px-4 rounded-full"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-[#8DB600] mx-6 text-black py-2 px-4 rounded-full"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </TemplateAdmin>
    );
};

export default EditarProveedor;
