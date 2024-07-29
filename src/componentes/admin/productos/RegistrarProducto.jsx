import { useState, useEffect } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precioUnitario, setPrecioUnitario] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [categoria, setCategoria] = useState('');
    const [proveedor, setProveedor] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [categoriasRes, proveedoresRes, productosRes] = await Promise.all([
                    axios.get('https://backendfarmacia-production.up.railway.app/nueva_esperanza/api/categories'),
                    axios.get('https://backendfarmacia-production.up.railway.app/nueva_esperanza/api/provider'),
                    axios.get('https://backendfarmacia-production.up.railway.app/api/products'),
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

        const productoExists = productos.some(producto => producto.nombre.toLowerCase() === trimmedNombre.toLowerCase());

        if (productoExists) {
            toast.error('El producto ya existe', { autoClose: 3000 });
            return;
        }

        if (!nombre || !precioUnitario || !cantidad || !fechaVencimiento || !categoria || !proveedor) {
            toast.error('Todos los campos son obligatorios', { autoClose: 3000 });
            return;
        }

        if (isNaN(precioUnitario) || isNaN(cantidad) || isNaN(categoria) || isNaN(proveedor)) {
            toast.error('Precio unitario, cantidad, categoría y proveedor deben ser números', { autoClose: 3000 });
            return;
        }

        const producto = {
            nombre: trimmedNombre,
            precio_unitario: parseFloat(precioUnitario),
            cantidad: parseInt(cantidad, 10),
            fecha_vencimiento: fechaVencimiento,
            categoria: parseInt(categoria, 10),
            proveedor: parseInt(proveedor, 10),
            isActive: 1,
        };

        console.log('Datos enviados:', producto);

        try {
            const response = await axios.post('https://backendfarmacia-production.up.railway.app/nueva_esperanza/api/products', producto);
            console.log('Respuesta del servidor:', response);
            toast.success('Producto guardado correctamente', { autoClose: 3000 });

            setNombre('');
            setPrecioUnitario('');
            setCantidad('');
            setFechaVencimiento('');
            setCategoria('');
            setProveedor('');
        } catch (error) {
            console.error('Error al guardar el producto:', error.response || error.message);
            toast.error('Error al guardar el producto: ' + (error.response?.data?.message || error.message), { autoClose: 3000 });
        }
    };

    const handleCancel = () => {
        setNombre('');
        setPrecioUnitario('');
        setCantidad('');
        setFechaVencimiento('');
        setCategoria('');
        setProveedor('');
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
                            <label htmlFor="fechaVencimiento" className="font-bold">
                                Fecha de vencimiento:
                            </label>
                            <input
                                id="fechaVencimiento"
                                type="date"
                                value={fechaVencimiento}
                                onChange={(e) => setFechaVencimiento(e.target.value)}
                                placeholder="Seleccione la fecha de vencimiento"
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
