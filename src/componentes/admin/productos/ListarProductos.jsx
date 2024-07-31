import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from "../../../config"; // Ajusta la ruta según tu estructura de archivos
import 'react-toastify/dist/ReactToastify.css';
import { getProductosAsc, getProductosDesc } from "../../../services/ProductService";
import { getAllProducts } from "../../../services/ProductService";
import TablaProductos from "./TablaProductos";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productosNoActivos, setProductosNoActivos] = useState([]);
  const [productosOrdenados, setProductosOrdenados] = useState([]);
  const [buscarDesc, setBuscarDec] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  let results = [];

  const crearProducto = () => {
    navigate('/registrar_producto');
  };

  useEffect(() => {
    if (message) {
      toast.success(message, { autoClose: 3000 });
      navigate(location.pathname, { replace: true, state: {} });
    }
    getAllProducts().then(data => {
      if (data && Array.isArray(data)) {
        setProductosNoActivos(data);
        const filteredData = data.filter(producto => producto.isActive == 1);
        setProductos(filteredData);
        if (productosOrdenados.length === 0) {
          setProductosOrdenados(filteredData); // Solo inicializa productosOrdenados si está vacío
        }
      } else {
        console.error('Data no es un array');
      }
    }).catch(error => {
      console.error('Error al obtener los productos:', error);
    });
  }, [message, results, productosOrdenados]);

  const buscador = (e) => {
    setBuscarDec(e.target.value);
  }

  if (!buscarDesc) {
    results = productosOrdenados.length > 0 ? productosOrdenados : productos;
  } else {
    results = productosNoActivos.filter((dato) =>
      dato.nombre.toLowerCase().includes(buscarDesc.toLocaleLowerCase())
    );
  }

  const handleDisable = async (id_producto) => {
    try {
      await axios.put(`${API_URL}/products/isactive/${id_producto}`, {
        isActive: 0
      });
      toast.success('Producto deshabilitado con éxito', { autoClose: 3000 });
      setProductos(productos.filter(producto => producto.id_producto !== id_producto));
      setProductosOrdenados(productosOrdenados.filter(producto => producto.id_producto !== id_producto));
    } catch (error) {
      console.error('Error al deshabilitar el producto:', error);
      toast.error('Error al deshabilitar el producto', { autoClose: 3000 });
    }
  };

  const handleEnable = async (id_producto) => {
    try {
      await axios.put(`${API_URL}/products/isactive/${id_producto}`, {
        isActive: 1
      });
      toast.success('Producto habilitado con éxito', { autoClose: 3000 });
      setProductos(productos.filter(producto => producto.id_producto !== id_producto));
      setProductosOrdenados(productosOrdenados.filter(producto => producto.id_producto !== id_producto));
    } catch (error) {
      console.error('Error al habilitar el producto:', error);
      toast.error('Error al habilitar el producto', { autoClose: 3000 });
    }
  };

  const listarAscendente = async () => {
    const productosAscendente = await getProductosAsc();
    setProductosOrdenados(productosAscendente);
  };

  const listarDescendente = async () => {
    const productosDescendente = await getProductosDesc();
    setProductosOrdenados(productosDescendente);
  };

  return (
    <TemplateAdmin>
      <ToastContainer />
      <div className="flex flex-col h-screen">
        <div className="bg-[#D0F25E]">
          <h2 className="py-2 px-6 font-semibold text-xl">Productos</h2>
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div className="w-[30%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center ml-6">
            <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1" />
            <input
              value={buscarDesc}
              onChange={buscador}
              type="text"
              placeholder="Buscar producto"
              className="w-full text-sm h-8 border-none rounded-md"
            />
          </div>
          <button onClick={listarAscendente}>Ascendente</button>
          <button onClick={listarDescendente}>Descendente</button>
          <button onClick={crearProducto} className="mr-6 py-1 rounded-md px-6 shadow hover:bg-[#b0d144] bg-[#8DB600]">
            Registrar Producto
          </button>
        </div>
        <div className="bg-[#D0F25E] h-6 w-full"></div>
        <div className="flex-grow overflow-hidden relative">
          <div className="w-full h-full overflow-x-auto absolute bottom-0">
            <table className="text-sm min-w-full">
              <thead className="bg-[#95A09D] text-left">
                <tr>
                  <th className="pl-5">N° del producto</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Proveedor</th>
                  <th>Peso</th>
                  <th className="pl-5">Precio</th>
                  <th>Cantidad en Stock</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="">
                {results.map((producto, index) => (
                  <TablaProductos
                    key={index}
                    productoId={producto.id_producto}
                    nombre={producto.nombre}
                    categoria={producto.categoria.descripcion}
                    proveedor={producto.proveedor.nombre}
                    peso={producto.peso}
                    precio={producto.precio_unitario}
                    cantidad={producto.cantidad}
                    active={producto.isActive}
                    onDisable={handleDisable}
                    onEnable={handleEnable}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </TemplateAdmin>
  );
}

export default ListarProductos;