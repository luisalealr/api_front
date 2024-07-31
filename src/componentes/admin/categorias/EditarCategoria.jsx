import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TemplateAdmin from "../templates/TemplateAdmin";
import { getCategoriaPorId } from "../../../services/CategoriaService";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Importar Toast

const EditarCategoria = () => {
    const { id } = useParams(); // Obtener el ID de la URL
    const [categoryName, setCategoryName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const data = await getCategoriaPorId(id); // Obtener categoría usando el ID
                if (data && data.descripcion) {
                    setCategoryName(data.descripcion); // Establecer la descripción en el estado
                } else {
                    console.error('Categoría no encontrada');
                }
            } catch (error) {
                console.error('Error al obtener la categoría:', error);
            }
        };

        fetchCategoria();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar si el campo está vacío
        if (categoryName.trim() === '') {
            toast.error('No se puede guardar una categoría vacía'); // Mostrar mensaje de error
            return; // No continuar si el campo está vacío
        }

        try {
            await axios.put(`https://backendfarmacia-production.up.railway.app/api/categories/description/${id}`, { descripcion: categoryName });
            navigate('/ver_categorias', { state: { message: 'Categoría actualizada correctamente' } }); // Redirigir y mostrar mensaje
        } catch (error) {
            console.error('Error al actualizar la categoría:', error);
        }
    };

    const handleCancel = () => {
        navigate('/ver_categorias'); // Redirigir sin guardar
    };

    return (
        <TemplateAdmin>
            <ToastContainer /> {/* Agregar ToastContainer para las notificaciones */}
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Editar Categoría
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-5">
                <form onSubmit={handleSubmit} className="w-full max-w-lg mt-10">
                    <div className="mb-4 flex items-center">
                        <label htmlFor="categoryName" className="ml-10 mr-2 font-bold w-40">
                            Nombre de la categoría:
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Escriba el nombre de la categoría"
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

export default EditarCategoria;
