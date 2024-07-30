import { PiEyeSlash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TablaProveedores = ({ proveedorId, nombre, telefono, onDisable }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/editar_proveedor/${proveedorId}`);
    };

    return (
        <>
            <tr className='text-left h-8 align-middle'>
                <td className="pl-5">#{proveedorId}</td>
                <td>{nombre}</td>
                <td>{telefono}</td>
                <td className="flex flex-row">
                    <div className='flex flex-row items-center cursor-pointer hover:bg-[#f1d167] w-fit m-[1px] px-[3px] rounded-sm mr-4'
                        onClick={handleEdit}>
                        <CiEdit size={16} className='mr-2' />Editar
                    </div>
                    <div
                        className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'
                        onClick={() => onDisable(proveedorId)}
                    >
                        <PiEyeSlash size={16} className='mr-2' />Deshabilitar
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan="4">
                    <hr />
                </td>
            </tr>
        </>
    );
}

export default TablaProveedores;
