import { useState } from "react";
import axios from 'axios';
import TemplateAdmin from "../templates/TemplateAdmin";

const GuardarProve = () => {
    const [nombre, setNombre] = useState(''); // Cambiado a "nombre"
    const [telefono, setTelefono] = useState(''); // Cambiado a "telefono"
    const [message, setMessage] = useState(''); // Estado para el mensaje

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const proveedor = {
                nombre,
                telefono,
                isActive: 0, // Valor por defecto
            };
            await axios.post('https://backendfarmacia-production.up.railway.app/api/provider', proveedor);
            setMessage('Proveedor guardado correctamente'); // Mensaje de éxito
            setNombre(''); // Limpiar el campo de nombre
            setTelefono(''); // Limpiar el campo de teléfono
        } catch (error) {
            // Manejar errores
            console.error('Error al guardar el proveedor:', error);
            setMessage('Error al guardar el proveedor'); // Mensaje de error
        }
    };

    const handleCancel = () => {
        setNombre('');
        setTelefono(''); // Limpiar el campo de teléfono también
        setMessage(''); // Limpiar el mensaje
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
