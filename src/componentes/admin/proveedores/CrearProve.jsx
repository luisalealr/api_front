import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../config";
import { getAllProveedores } from "../../../services/ProveedorService";

const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}; 

const CrearProveedor = () => {
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchProveedores = async () => {
            const result = await getAllProveedores();
            if (result) {
              setProveedores(result); // Asigna directamente los datos devueltos
            }
          };
      
          fetchProveedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNombre = nombre.trim();
        const trimmedTelefono = telefono.trim();
        if (!trimmedNombre || !trimmedTelefono) {
            toast.error('El nombre y el teléfono del proveedor son obligatorios', { autoClose: 1500 });
            return;
        }
        const normalizedNombre = normalizeString(trimmedNombre);
        try {
            // Buscar proveedor por nombre
            const existingProveedor = proveedores.find(proveedor => normalizeString(proveedor.nombre) === normalizedNombre);
            
            if (existingProveedor) {
                if (existingProveedor.isActive === 0) {
                        if (existingProveedor.telefono === trimmedTelefono) {
                        // Habilitar proveedor
                        await axios.put(`${API_URL}/provider/isActive/${existingProveedor.id_proveedor}`, {
                            isActive: 1
                        });
                        toast.success('Proveedor habilitado correctamente', { autoClose: 1500 });
                        navigate('/listar_proveedores', { state: { message: 'Proveedor habilitado correctamente' } });
                    } else {
                        // Crear nuevo proveedor con el mismo nombre pero diferente teléfono
                        await axios.post(
                            `${API_URL}/provider`,
                            {
                                nombre: trimmedNombre,
                                telefono: trimmedTelefono,
                                isActive: 1
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );
                        toast.success('Proveedor creado correctamente', { autoClose: 1500 });
                        navigate('/listar_proveedores', { state: { message: 'Proveedor creado correctamente' } });
                    }
                } else {
                    toast.error('El proveedor ya existe', { autoClose: 1500 });
                }
            } else {
                // Crear nuevo proveedor
                await axios.post(
                    `${API_URL}/provider`,
                    {
                        nombre: trimmedNombre,
                        telefono: trimmedTelefono,
                        isActive: 1
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                toast.success('Proveedor creado correctamente', { autoClose: 1500 });
                navigate('/listar_proveedores', { state: { message: 'Proveedor creado correctamente' } });
            }
        } catch (error) {
            toast.error('Error al procesar la solicitud: ' + (error.response?.data?.message || error.message), { autoClose: 1500 });
        }
    };

    const handleCancel = () => {
        navigate('/listar_proveedores');
        setNombre('');
        setTelefono('');
    };

    return (
        <TemplateAdmin>
            <ToastContainer />
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Crear Proveedor
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-5">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10">
                    <div className="mb-4 flex items-center">
                        <label htmlFor="nombre" className="ml-10 mr-2 font-bold w-40">
                            Nombre del proveedor:
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Escriba el nombre del proveedor"
                            className="border border-gray-300 p-2 rounded-md flex-grow"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label htmlFor="telefono" className="ml-10 mr-2 font-bold w-40">
                            Teléfono del proveedor:
                        </label>
                        <input
                            id="telefono"
                            type="text"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            placeholder="Escriba el teléfono del proveedor"
                            className="border border-gray-300 p-2 rounded-md flex-grow"
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

export default CrearProveedor;
