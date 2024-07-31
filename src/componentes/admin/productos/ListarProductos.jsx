import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from "../../../config"; // Ajusta la ruta según tu estructura de archivos
import 'react-toastify/dist/ReactToastify.css';
import { getProducts } from "../../../services/ProductService";
import TablaProductos from "./TablaProductos";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [buscarDesc, setBuscarDec] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const crearProducto = () => {
    navigate('/registrar_producto');
  };

  useEffect(() => {
    if (message) {
      toast.success(message, { autoClose: 3000 });
      navigate(location.pathname, { replace: true, state: {} });
    }
    getProducts().then(data => {
      if (data && Array.isArray(data)) {
        const filteredData = data.filter(categoria => categoria.isActive == 1);
        setProductos(filteredData);
      } else {
        console.error('Data no es un array');
      }
    }).catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
  }, [message]);

  const buscador = (e) => {
    setBuscarDec(e.target.value);
  }

  let results = []
  if (!buscarDesc) {
    results = productos;
  } else {
    results = productos.filter((dato) =>
      dato.nombre.toLowerCase().includes(buscarDesc.toLocaleLowerCase())
    )
  }

  const handleDisable = async (id_categoria) => {
    try {
      await axios.put(`${API_URL}/categories/${id_categoria}`, {
        isActive: 0
      });
      toast.success('Categoría deshabilitada con éxito', { autoClose: 3000 });
      setProductos(productos.filter(categoria => categoria.id_categoria !== id_categoria));
    } catch (error) {
      console.error('Error al deshabilitar la categoría:', error);
      toast.error('Error al deshabilitar la categoría', { autoClose: 3000 });
    }
  };

  return (
    <TemplateAdmin>
      <ToastContainer />
      <div className="flex flex-col">
        <div className="bg-[#D0F25E]">
          <h2 className="py-2 px-6 font-semibold text-xl">Productos</h2>
        </div>
        <div className="w-full h-16 flex items-center justify-between">
          <div className="w-[30%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center ml-6">
            <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1" />
            <input
              value={buscarDesc}
              onChange={buscador}
              type="text" placeholder="Buscar categoría"
              className="w-full text-sm h-8 border-none rounded-md"
            />
          </div>
          <button onClick={crearProducto} className="mr-6 py-1 rounded-md px-6 shadow hover:bg-[#b0d144] bg-[#8DB600]">Registrar Producto</button>
        </div>
        <div className="bg-[#D0F25E] h-6 w-full"></div>
        <table>
          <thead className="bg-[#95A09D] text-left">
            <tr>
              <th className="pl-5">N° del producto</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Proveedor</th>
              <th>Precio</th>
              <th>Cantidad en Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((producto, index) => (
              <TablaProductos
                key={index}
                productoId={producto.id_producto}
                nombre={producto.nombre}
                categoria={producto.categoria.descripcion}
                proveedor={producto.proveedor.nombre}
                precio={producto.precio_unitario}
                cantidad={producto.cantidad}
                onDisable={handleDisable} // Pasa la función al componente TablaCategorias
              />
            ))}
          </tbody>
        </table>
      </div>
    </TemplateAdmin>
  );
}

export default ListarProductos;
