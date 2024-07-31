import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import { IoSearch } from "react-icons/io5";
import { getAllCategorias } from "../../../services/CategoriaService";
import TablaCategorias from "./TablaCategorias";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { API_URL } from "../../../config"; // Ajusta la ruta según tu estructura de archivos
import 'react-toastify/dist/ReactToastify.css';

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriasNoActivas, setCategoriasNoActivas] = useState([]);
  const [buscarDesc, setBuscarDec] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  let results = [] 

  const crearCategoria = () => {
    navigate('/registrar_categoria');
  };

  useEffect(() => {
    if (message) {
      toast.success(message, { autoClose: 1500 });
      navigate(location.pathname, { replace: true, state: {} });
    }

    getAllCategorias().then(data => {
      if (data && Array.isArray(data)) {
        setCategoriasNoActivas(data);
        const filteredData = data.filter(categoria => categoria.isActive == 1);
        setCategorias(filteredData);
      } else {
        console.error('Data no es un array');
      }
    }).catch(error => {
      console.error('Error al obtener las categorías:', error);
    });
  }, [message, results]);

  const buscador = (e) => {
    setBuscarDec(e.target.value);
  }

 
  if (!buscarDesc) {
    results = categorias;
  } else {
    results = categoriasNoActivas.filter((dato) =>
      dato.descripcion.toLowerCase().includes(buscarDesc.toLocaleLowerCase())
    )
  }

  const handleDisable = async (id_categoria) => {
    try {
      await axios.put(`${API_URL}/categories/${id_categoria}`, {
        isActive: 0
      }); 
      toast.success('Categoría deshabilitada con éxito', { autoClose: 1500 });
      setCategorias(categorias.filter(categoria => categoria.id_categoria !== id_categoria));
    } catch (error) {
      console.error('Error al deshabilitar la categoría:', error);
      toast.error('Error al deshabilitar la categoría', { autoClose: 1500 });
    }
  };

  const handleEnable = async (id_categoria) => {
    try {
        await axios.put(`${API_URL}/categories/${id_categoria}`, {
            isActive: 1
        });
        toast.success('Categoría habilitada con éxito', { autoClose: 1500 });
        setCategorias(categorias.filter(categoria => categoria.id_categoria !== id_categoria));
    } catch (error) {
        console.error('Error al habilitar la categoría:', error);
        toast.error('Error al habilitar la categoría', { autoClose: 1500 });
    }
};

  return (
    <TemplateAdmin>
      <ToastContainer />
      <div className="flex flex-col">
        <div className="bg-[#D0F25E]">
          <h2 className="py-2 px-6 font-semibold text-xl">Categorías</h2>
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
          <button onClick={crearCategoria} className="mr-6 py-1 rounded-md px-6 shadow hover:bg-[#b0d144] bg-[#8DB600]">Registrar Categoría</button>
        </div>
        <div className="bg-[#D0F25E] h-6 w-full"></div>
        <table className=" text-sm">
          <thead className="bg-[#95A09D] text-left">
            <tr>
              <th className="pl-5">N° de la categoría</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((categoria, index) => (
              <TablaCategorias
                key={index}
                categoriaId={categoria.id_categoria}
                descripcion={categoria.descripcion}
                onDisable={handleDisable} 
                onEnable={handleEnable}
                active={categoria.isActive}
              />
            ))}
          </tbody>
        </table>
      </div>
    </TemplateAdmin>
  );
}

export default ListarCategorias;
