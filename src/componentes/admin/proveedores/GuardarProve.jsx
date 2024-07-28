import React, { useState, useEffect } from "react";
import axios from 'axios';
import TemplateAdmin from "../templates/TemplateAdmin";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GuardarProve = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzIxOTU0NjA4LCJleHAiOjE3MjIwNDEwMDh9.a7xi9ilutxihnbLh0TVxIwgsoFOUpo75SXDn1Qdhero';

    useEffect(() => {
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('https://backendfarmacia-production.up.railway.app/api/provider', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Respuesta de la API:', response.data);
                setProveedores(response.data);
            } catch (error) {
                console.error('Error al obtener los proveedores:', error);
                toast.error(`Error al obtener los proveedores: ${error.message}`, { autoClose: 4000 });
            }
        };

        fetchProveedores();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNombre = nombre.trim();

        const proveedorExists = proveedores.some(proveedor => proveedor.nombre.toLowerCase() === trimmedNombre.toLowerCase());

        console.log('Proveedores:', proveedores);
        console.log('Nombre a verificar:', trimmedNombre);
        console.log('Proveedor ya existe:', proveedorExists);

        if (proveedorExists) {
            toast.error('El proveedor ya existe', { autoClose: 4000 });
            return;
        }

        try {
            const response = await axios.post(
                'https://backendfarmacia-production.up.railway.app/api/provider',
                {
                    nombre: trimmedNombre,
                    telefono,
                    isActive: 0
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success('Proveedor guardado correctamente', { autoClose: 4000 });
            setNombre('');
            setTelefono('');
            setProveedores([...proveedores, response.data]);
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            toast.error('Error al guardar el proveedor: ' + (error.response?.data?.message || error.message), { autoClose: 4000 });
        }
    };

    const handleCancel = () => {
        setNombre('');
        setTelefono('');
    };

    return (
        <TemplateAdmin>
            <ToastContainer />
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Registrar proveedor
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
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Escriba el nombre del nuevo proveedor"
                            className="border border-gray-300 p-2 w-[35%] rounded-md"
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
                            placeholder="Escriba el teléfono del nuevo proveedor"
                            className="border border-gray-300 w-[35%] p-2 rounded-md"
                        />
                    </div>
                    <div className="flex m-10">
                        <button
                            type="submit"
                            className="bg-[#8DB600] text-black py-2 px-4 rounded-full"
                        >
                            Registrar
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

export default GuardarProve;
