/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoIosArrowDropright, IoIosArrowDropdown } from 'react-icons/io';
import { FaRegTrashCan } from "react-icons/fa6";

const TablaVentas = ({ numeroFactura, fecha, cantidadProductos, precioTotal, productos }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  }; 
    return<>
        <tr className='text-left h-8 align-middle'>
            <td onClick={handleToggle} className="cursor-pointer ">
                {isExpanded ? <IoIosArrowDropdown color="#8DB600" /> : <IoIosArrowDropright color="#8DB600" />}
            </td>
            <td>{numeroFactura}</td>
            <td>{fecha}</td>
            <td>{cantidadProductos}</td>
            <td>${precioTotal}</td>
            <td >
                <div className='flex flex-row items-center cursor-pointer hover:bg-[#d13737] w-fit m-[1px] px-[3px] rounded-sm'>
                    <FaRegTrashCan size={16} className='mr-2'/>Eliminar
                </div>
            </td>
        </tr>
        <tr>
            <td colSpan="6">
                <hr />
            </td>
        </tr>
        {isExpanded && (
            <tr>
                <td colSpan={6}>
                    <table className="min-w-full divide-y divide-gray-200 bg-gray-100 ">
                        <thead>
                            <tr className='text-gray-500 text-left'>
                                <th >Número de Producto</th>
                                <th>Nombre</th>
                                <th>Código del Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, index) => (
                            <tr className='text-gray-500 text-left' key={index}>
                                <td>{producto.numeroProducto}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.codigoProducto}</td>
                                <td>{producto.cantidad}</td>
                                <td>${producto.precioUnitario}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
            </tr> 
        )}
            
    </>
    
}

export default TablaVentas;