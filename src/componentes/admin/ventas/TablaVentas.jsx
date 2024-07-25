import { useState } from 'react';
import { IoIosArrowDropright, IoIosArrowDropdown } from 'react-icons/io';

const TablaVentas = ({ numeroFactura, fecha, cantidadProductos, precioTotal, productos }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
    return<>
            <tr>
                <td onClick={handleToggle} className="cursor-pointer">
                    {isExpanded ? <IoIosArrowDropdown color="#8DB600" /> : <IoIosArrowDropright color="#8DB600" />}
                </td>
                <td>{numeroFactura}</td>
                <td>{fecha}</td>
                <td>{cantidadProductos}</td>
                <td>{precioTotal}</td>
                <td>Eliminar</td>
                
            </tr>
           
           {isExpanded && (
            <tr><td colSpan={6}>
            
            <table className="min-w-full divide-y divide-gray-200 mt-2">
                    <thead>
                        <tr>
                        <th >Número de Producto</th>
                        <th>Nombre</th>
                        <th>Código del Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                        <tr key={index}>
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