import { PiEyeSlash, PiEye } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TablaCategorias = ({ categoriaId, descripcion, onDisable, onEnable, active }) => {
    const navigate = useNavigate();

    let estaActiva = false;
    if(active == 1){
        estaActiva = true;
    }

    const handleEdit = () => {
        navigate(`/editar_categoria/${categoriaId}`);
    }; 

    return ( 
        <>
            <tr className='text-left h-8 align-middle'>
                <td className="pl-5">#{categoriaId}</td>
                <td>{descripcion}</td>
                {estaActiva && (
                    <td className="flex flex-row">
                        <div className='flex flex-row items-center cursor-pointer hover:bg-[#f1d167] w-fit m-[1px] px-[3px] rounded-sm mr-4'
                            onClick={handleEdit}>
                            <CiEdit size={16} className='mr-2' />Editar
                        </div>
                        <div
                            className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'
                            onClick={() => onDisable(categoriaId)}
                        >
                            <PiEyeSlash size={16} className='mr-2' />Deshabilitar
                        </div>
                    </td>
                )}
                {!estaActiva && (
                    <td className="flex flex-row">
                        <div
                            className='flex flex-row items-center cursor-pointer hover:bg-[#63d137] w-fit m-[1px] px-[3px] rounded-sm'
                            onClick={() => onEnable(categoriaId)}
                        >
                            <PiEye size={16} className='mr-2' />Habilitar
                        </div>
                    </td>
                )}
            </tr>
            <tr>
                <td colSpan="3">
                    <hr />
                </td>
            </tr>
        </>
    );
}

export default TablaCategorias;
