import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from "../../../config";

const RegistrarProducto = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [peso, setPeso] = useState('');
    const [categoria, setCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriasRes, proveedoresRes, productosRes] = await Promise.all([
                    axios.get(`${API_URL}/categories`),
                    axios.get(`${API_URL}/provider`),
                    axios.get(`${API_URL}/products`),
                ]);

                setCategorias(categoriasRes.data);
                setProveedores(proveedoresRes.data);
                setProductos(productosRes.data);
            } catch (error) {
                console.error('Error al obtener los datos iniciales:', error);
            }
        };

        fetchInitialData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedNombre = nombre.trim();
        const parsedPeso = parseFloat(peso);

        // Validar campos obligatorios
        if (!nombre || !precioUnitario || !cantidad || !peso || !categoria || !proveedor) {
            toast.error('Todos los campos son obligatorios', { autoClose: 1500 });
            return;
        }

        // Validar tipos de datos
        if (isNaN(precioUnitario) || isNaN(cantidad) || isNaN(peso) || isNaN(proveedor)) {
            toast.error('Precio unitario, cantidad, peso y proveedor deben ser números', { autoClose: 1500 });
            return;
        }

        // Validar existencia de producto
        const productoExistente = productos.find(producto =>
            producto.nombre.toLowerCase() === trimmedNombre.toLowerCase() && producto.peso === parsedPeso
        );

        if (productoExistente) {
            toast.error('El producto ya registrado con este peso', { autoClose: 1500 });
            return;
        }

        const producto = {
            nombre: trimmedNombre,
            precio_unitario: parseFloat(precioUnitario),
            cantidad: parseInt(cantidad, 10),
            peso: parsedPeso,
            categoria: parseInt(categoria, 10),
            proveedor: parseInt(proveedor, 10),
            isActive: 1,
        };

        console.log('Datos enviados:', producto);

        try {
            const response = await axios.post(`${API_URL}/products`, producto);
            console.log('Respuesta del servidor:', response);
            toast.success('Producto guardado correctamente', { autoClose: 1500 });

            // Limpiar los campos después de registrar
            setNombre('');
            setPrecioUnitario('');
            setCantidad('');
            setPeso('');
            setCategoria('');
            setProveedor('');

            // Redirigir a la página de listar productos
            navigate('/listar_productos');
        } catch (error) {
            console.error('Error al guardar el producto:', error.response || error.message);
            toast.error('Error al guardar el producto: ' + (error.response?.data?.message || error.message), { autoClose: 1500 });
        }
    };

    const handleCancel = () => {
        navigate('/listar_productos');
    };

    return (
        <TemplateAdmin>
            <div className="bg-[#D0F25E]">
                <h1 className="ml-5 py-3 font-bold text-black text-xl w-full">
                    Registrar producto
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
                                placeholder="Escribe el peso"
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            />
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="categoria" className="font-bold">
                                Categoría:
                            </label>
                            <select
                                id="categoria"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            >
                                <option value="">Seleccione una categoría</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.id_categoria} value={categoria.id_categoria}>
                                        {categoria.descripcion}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 flex flex-col w-1/2 px-2">
                            <label htmlFor="proveedor" className="font-bold">
                                Proveedor:
                            </label>
                            <select
                                id="proveedor"
                                value={proveedor}
                                onChange={(e) => setProveedor(e.target.value)}
                                className="border border-gray-300 p-2 rounded-md w-[calc(100%-80px)]"
                            >
                                <option value="">Seleccione un proveedor</option>
                                {proveedores.map(proveedor => (
                                    <option key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                                        {proveedor.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
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

export default RegistrarProducto;
