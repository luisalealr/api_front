import { useParams, useNavigate } from 'react-router-dom';
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const EditarProducto = () => {
    const { id } = useParams(); // Obtener el ID del producto de la URL
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [peso, setPeso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [nombreProveedor, setNombreProveedor] = useState('');

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await axios.get(`https://backendfarmacia-production.up.railway.app/api/products/product/${id}`);
                const producto = response.data;
                setNombre(producto.nombre);
                setPrecioUnitario(producto.precio_unitario);
                setCantidad(1);
                setPeso(producto.peso);
                setCategoria(producto.categoria.id_categoria);
                setNombreCategoria(producto.categoria.descripcion);
                setProveedor(producto.proveedor.id_proveedor);
                setNombreProveedor(producto.proveedor.nombre);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
                toast.error(`Error al obtener el producto: ${error.message}`, { autoClose: 1500 });
            }
        };
        fetchProducto();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Actualizar el precio unitario y la cantidad
            const response = await axios.put(`https://backendfarmacia-production.up.railway.app/api/products/price/${id}`, {
                precio_unitario: precioUnitario,
                cantidad: cantidad
            });

            if (response.status === 200) {
                toast.success('Producto actualizado correctamente');
                navigate('/listar_productos'); // Cambia esto a la ruta correcta
            } else {
                throw new Error('Error en la actualización');
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            if (error.response && error.response.status === 401) {
                navigate('/listar_productos'); // Redirige al login si hay un error de autenticación
            } else {
                toast.error('Error al actualizar el producto');
            }
        }
    };
 

    const handleCancel = () => {
        navigate('/listar_productos');
    };

    return (
        <TemplateAdmin>
            <ToastContainer />
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
                                readOnly
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)] bg-gray-200 cursor-not-allowed"
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
                                Cantidad a añadir:
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
                                readOnly
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)] bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="categoria" className="font-bold">
                                Categoría:
                            </label>
                            <input
                                id="categoria"
                                type="text"
                                value={nombreCategoria}
                                readOnly
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)] bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="proveedor" className="font-bold">
                                Proveedor:
                            </label>
                            <input
                                id="proveedor"
                                type="text"
                                value={nombreProveedor}
                                readOnly
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)] bg-gray-200 cursor-not-allowed"
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