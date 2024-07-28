import { useState, useEffect } from "react";
import axios from 'axios';
import TemplateAdmin from "../templates/TemplateAdmin";

const GuardarProve = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [proveedores, setProveedores] = useState([]);

    useEffect(() => {
        // Obtener todos los proveedores existentes
        const fetchProveedores = async () => {
            try {
                const response = await axios.get('https://backendfarmacia-production.up.railway.app/api/providers');
                setProveedores(response.data);
            } catch (error) {
                console.error('Error al obtener los proveedores:', error);
            }
        };

        fetchProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNombre = nombre.trim(); // Trim espacios en blanco

        // Verificar si el proveedor ya existe
        const proveedorExists = proveedores.some(proveedor => proveedor.nombre.toLowerCase() === trimmedNombre.toLowerCase());

        if (proveedorExists) {
            setError('El proveedor ya existe');
            setMessage('');
            return;
        }

        try {
            const proveedor = {
                nombre: trimmedNombre,
                telefono,
                isActive: 0, // Valor por defecto
            };
            await axios.post('https://backendfarmacia-production.up.railway.app/api/provider', proveedor);
            setMessage('Proveedor guardado correctamente');
            setError('');
            setNombre('');
            setTelefono('');
            // Actualizar la lista de proveedores
            setProveedores([...proveedores, { nombre: trimmedNombre, telefono }]);
        } catch (error) {
            console.error('Error al guardar el proveedor:', error);
            setMessage('');
            setError('Error al guardar el proveedor');
        }
    };

    const handleCancel = () => {
        setNombre('');
        setTelefono('');
        setMessage('');
        setError('');
    };

    return (
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Registrar proveedor
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-10 w-full">
                {/* Mensaje de aceptación */}
                {message && (
                    <div className="bg-[#C7F2AF] text-green-800 p-2 rounded mb-4">
                        {message}
                    </div>
                )}
                {/* Mensaje de error */}
                {error && (
                    <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
                        {error}
                    </div>
                )}
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
