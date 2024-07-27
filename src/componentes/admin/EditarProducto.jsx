import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TemplateAdmin from "./templates/TemplateAdmin";
import axios from 'axios';

const EditarProducto = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const [nombre, setNombre] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [peso, setPeso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`https://backendfarmacia-production.up.railway.app/api/products/product/${id}`);
                const producto = response.data;
                setNombre(producto.nombre);
                setPrecioUnitario(producto.precio);
                setCantidad(producto.cantidad);
                setPeso(producto.peso);
                setCategoria(producto.categoria.id_categoria);
                setProveedor(producto.proveedor.id_proveedor);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            }
        };
        fetchProducto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const producto = {
                nombre,
                precio_unitario: precioUnitario,
                cantidad,
                peso,
                categoria,
                proveedor,
                isActive: 1,
            };
            await axios.post(`https://backendfarmacia-production.up.railway.app/api/products/product/${id}`, producto);
            console.log('Producto actualizado');
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    };

    const handleCancel = () => {
        setNombre('');
        setPrecioUnitario('');
        setCantidad('');
        setPeso('');
        setCategoria('');
        setProveedor('');
    };

    return (
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Editar producto
                </h1>
            </div>
            <div className="flex flex-col mt-4 ml-10 w-full">
                <form onSubmit={handleSubmit} className="w-full mt-10">
                    <div className="flex flex-wrap">
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="nombre" className="font-bold">
                                Nombre del producto:
                            </label>
                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Escriba el nombre del nuevo producto"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="precioUnitario" className="font-bold">
                                Precio unitario:
                            </label>
                            <input
                                id="precioUnitario"
                                type="text"
                                value={precioUnitario}
                                onChange={(e) => setPrecioUnitario(e.target.value)}
                                placeholder="Escriba el precio unitario"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="cantidad" className="font-bold">
                                Cantidad:
                            </label>
                            <input
                                id="cantidad"
                                type="text"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                placeholder="Escriba la cantidad"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="peso" className="font-bold">
                                Peso:
                            </label>
                            <input
                                id="peso"
                                type="text"
                                value={peso}
                                onChange={(e) => setPeso(e.target.value)}
                                placeholder="Escriba el peso del producto"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="categoria" className="font-bold">
                                Categoría:
                            </label>
                            <input
                                id="categoria"
                                type="text"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                placeholder="Escriba el ID de la categoría"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="proveedor" className="font-bold">
                                Proveedor:
                            </label>
                            <input
                                id="proveedor"
                                type="text"
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                                placeholder="Escriba el ID del proveedor"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
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

export default EditarProducto;
