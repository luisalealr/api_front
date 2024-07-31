import { PiEyeSlash, PiEye } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TablaProductos = ({ productoId, nombre, categoria, proveedor, peso, precio, cantidad, active, onDisable, onEnable }) => {
    const navigate = useNavigate();

    let estaActivo = false;
    if (active == 1) {
        estaActivo = true;
    }

    const handleEdit = () => {
        if (active == 1) {
            navigate(`/editar_producto/${productoId}`);
            estaActivo = true;
        }
    };

    return (
        <>
            <tr className='text-left h-8 align-middle'>
                <td className="pl-5">#{productoId}</td>
                <td>{nombre}</td>
                <td>{categoria}</td>
                <td>{proveedor}</td>
                <td>{peso}</td>
                <td className="pl-5">{precio}</td>
                <td >{cantidad}</td>
                {estaActivo && (
                    <td className="flex flex-row">
                        <div className='flex flex-row items-center cursor-pointer hover:bg-[#f1d167] w-fit m-[1px] px-[3px] rounded-sm mr-4'
                            onClick={handleEdit}>
                            <CiEdit size={16} className='mr-2' />Editar
                        </div>
                        <div
                            className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'
                            onClick={() => onDisable(productoId)}
                        >
                            <PiEyeSlash size={16} className='mr-2' />Deshabilitar
                        </div>
                    </td>
                )}
                {!estaActivo && (
                    <td className="flex flex-row">
                        <div
                            className='flex flex-row items-center cursor-pointer hover:bg-[#63d137] w-fit m-[1px] px-[3px] rounded-sm'
                            onClick={() => onEnable(productoId)}
                        >
                            <PiEye size={16} className='mr-2' />Habilitar
                        </div>
                    </td>
                )}
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
