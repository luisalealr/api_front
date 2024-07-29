/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { IoIosArrowDropright, IoIosArrowDropdown } from 'react-icons/io';

const TablaVentas = ({ facturaId, cliente,  fecha, precioTotal, productos }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let fechaFormato = fecha.split('T')[0];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  }; 

    const [cantidad, setCantidad] = useState('');

    useEffect(
        ()=>{
            getCantidad()
        },[productos]
      )

    const getCantidad = ()=>{
        let cont = 0;
        productos.forEach(producto =>{
            cont += Number(producto.cantidad)
        })
        setCantidad(cont);
    };

    return<> 
        <tr className='text-left h-8 align-middle'>
            <td onClick={handleToggle} className="cursor-pointer ">
                {isExpanded ? <IoIosArrowDropdown color="#8DB600" /> : <IoIosArrowDropright color="#8DB600" />}
            </td>
            <td>{facturaId}</td>
            <td>{cliente}</td>
            <td>{fechaFormato}</td>
            <td>{cantidad}</td>
            <td>${precioTotal}</td>
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
                                <th>Precio Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, index) => (
                            <tr className='text-gray-500 text-left' key={index}>
                                <td>{index+1}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.id_producto}</td>
                                <td>{producto.cantidad}</td>
                                <td>${producto.precio}</td>
                                <td>${producto.precio * producto.cantidad}</td>
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