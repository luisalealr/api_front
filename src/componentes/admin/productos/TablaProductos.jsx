import { PiEyeSlash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TablaProductos = ({ productoId, nombre, categoria, proveedor, precio, cantidad, onDisable }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editar_categoria/${productoId}`);
    }; 

    return (
        <>
            <tr className='text-left h-8 align-middle'>
                <td className="pl-5">#{productoId}</td>
                <td>{nombre}</td>
                <td>{categoria}</td>
                <td>{proveedor}</td>
                <td>{precio}</td>
                <td>{cantidad}</td>
                <td className="flex flex-row">
                    <div className='flex flex-row items-center cursor-pointer hover:bg-[#f1d167] w-fit m-[1px] px-[3px] rounded-sm mr-4' onClick={handleEdit}>
                        <CiEdit size={16} className='mr-2' />Editar
                    </div>
                    <div
                        className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'
                        onClick={() => onDisable(productoId)} // Llama a la función para deshabilitar
                    >
                        <PiEyeSlash size={16} className='mr-2' />Deshabilitar
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan="8">
                    <hr />
                </td>
            </tr>
        </>
    );
}

export default TablaProductos;
