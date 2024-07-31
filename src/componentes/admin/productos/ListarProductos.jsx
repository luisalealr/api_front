import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from "../../../config"; // Ajusta la ruta según tu estructura de archivos
import 'react-toastify/dist/ReactToastify.css';
import { getProductosAsc, getProductosDesc, getProducts } from "../../../services/ProductService";
import { getAllProducts } from "../../../services/ProductService";
import TablaProductos from "./TablaProductos";

const ListarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [productosNoActivos, setProductosNoActivos] = useState([]);
  const [productosOrdenados, setProductosOrdenados] = useState([]);
  const [buscarDesc, setBuscarDec] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  let results = [];
  const [selectedRadio, setSelectedRadio] = useState('');

  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
  };

  const handleSubmit = () => {
    setIsFilterVisible(!isFilterVisible);
    if(selectedRadio == 'option1'){
      listarAscendente();
    }else if(selectedRadio == 'option2'){
      listarDescendente();
    }else if(selectedRadio == 'defecto'){
      obtenerProductos();
    }
    setSelectedRadio('');
  };

  const crearProducto = () => {
    navigate('/registrar_producto');
  };

  const obtenerProductos = async () =>{
    const productosActivos = await getProducts();
    setProductos(productosActivos);
    setProductosOrdenados(productosActivos); 
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

  const filtrar = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <TemplateAdmin>
      <ToastContainer />
      <div className="flex flex-col h-screen">
        <div className="bg-[#D0F25E]">
          <h2 className="py-2 px-6 font-semibold text-xl">Productos</h2>
        </div>
        <div className="w-full  py-3 flex items-center justify-between">
          <div className="w-[60%] flex items-center">
            <div className="flex flex-col ">
              <div  onClick={filtrar} className="w-fit shadow-sm flex flex-row px-2 mx-9 py-1 border border-[#999999] justify-center items-center rounded-md cursor-pointer">
                <HiFilter color="rgba(141, 182, 0, 0.79)" fontSize={25}/>
                <h5>Filtro</h5>
              </div>
              {isFilterVisible && (
                <div className="border border-[#999999] absolute left-80 top-24 mt-2 w-auto flex flex-col text-sm bg-gray-200 py-2 px-6 rounded-md shadow-xl">
                  <div className="flex flex-col mb-3">
                    <h5>Ordenar por cantidad</h5>
                  </div>
                  <div className="flex flex-col mb-1">
                    <label>
                      <input 
                        type="radio" 
                        name="defecto" 
                        value="defecto"
                        checked={selectedRadio === 'defecto'}
                        onChange={handleRadioChange}
                        className="mr-2"/>
                        Por defecto
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="option1" 
                        value="option1"
                        checked={selectedRadio === 'option1'}
                        onChange={handleRadioChange}
                        className="mr-2"/>
                        Ascendente
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="option2" 
                        value="option2" 
                        checked={selectedRadio === 'option2'}
                        onChange={handleRadioChange}
                        className="mr-2"/>
                        Desscendente
                    </label>
                  </div>
                  <button 
                    onClick={handleSubmit}
                    className="w-fit shadow-sm rounded-md py-[2px] border mt-2 border-[#999999] bg-white px-2"
                  >Aceptar</button>
                </div>
              )}
            </div>
            <div className="w-[50%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center ">
              <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1" />
              <input
                value={buscarDesc}
                onChange={buscador}
                type="text"
                placeholder="Buscar producto"
                className="w-full text-sm h-8 border-none rounded-md"
              />
            </div>
          </div>
          <button onClick={crearProducto} className="mr-6 py-1 rounded-md w-fit px-6 shadow hover:bg-[#b0d144] bg-[#8DB600]">
            Registrar Producto
          </button>
        </div>
        <div className="bg-[#D0F25E] py-3 w-full"></div>
        <table className=" text-sm">
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
          <tbody>
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
    </TemplateAdmin>
  );
}

export default ListarProductos;