import { PiEyeSlash } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";


/* eslint-disable react/prop-types */
const TablaCategorias = ({categoriaId, descripcion}) =>{
    return<>
    <tr className='text-left h-8 align-middle'>
        <td>#{categoriaId}</td>
        <td>{descripcion}</td>
        <td className="flex flex-row">
            <div className='flex flex-row items-center cursor-pointer hover:bg-[#f1d167] w-fit m-[1px] px-[3px] rounded-sm mr-4'>
                <CiEdit size={16} className='mr-2'/>Editar
            </div>
            <div className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'>
                <PiEyeSlash size={16} className='mr-2'/>Deshabilitar
            </div>
        </td>
    </tr>  
    <tr>
        <td colSpan="3">
            <hr />
        </td>
    </tr>
    </>
}

export default TablaCategorias;