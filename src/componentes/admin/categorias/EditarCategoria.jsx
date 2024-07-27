import { useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';

const EditarCategoria = () => {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories', { name: categoryName });
            // Manejar la respuesta exitosa
            console.log('Categoría guardada');
            setCategoryName(''); // Limpiar el campo después de guardar
        } catch (error) {
            // Manejar errores
            console.error('Error al guardar la categoría:', error);
        }
    };

    const handleCancel = () => {
        setCategoryName('');
    };

    return (
        <TemplateAdmin>
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
                            placeholder="Escriba el nombre de la nueva categoría"
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
