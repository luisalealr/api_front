import React, { useState } from 'react';
import TemplateAdmin from "./templates/TemplateAdmin";


export default function CrearCategoria() {
    return <>
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full ">
                    Crear Categoría
                </h1>
            </div>
            <div className='w-full p-10 flex '>
                <div className='w-[80%] flex text-xl '>

                    <label htmlFor="categoria" className="w-[30%] font-bold block text-gray-700">Nombre de la Categoría:</label>
                    <input
                        type="text"
                        id="nombreCategoria"
                        name="nombreCategoria"

                        placeholder="Escriba el nombre de la nueva categoria"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        className="w-[40%] border rounded-md focus:ring focus:ring-indigo-200"
                    />

                </div>
            </div>
        </TemplateAdmin>
    </>
}