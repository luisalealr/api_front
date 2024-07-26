/* eslint-disable react/prop-types */
const TablaRegistroProductos = ({ numeroProducto, codigoProducto, nombre, cantidad, precioUnitario, precioTotal }) => {
    return<>
        <tr className='text-left h-8 align-middle'>
            <th>
                <input type="checkbox" />
            </th>
            <td>{numeroProducto}</td>
            <td>{codigoProducto}</td>
            <td>{nombre}</td>
            <td>{cantidad}</td>
            <td>${precioUnitario}</td>
            <td>${precioTotal}</td>
        </tr>
        <tr>
            <td colSpan="7">
                <hr />
            </td>
        </tr>
    </>

}

export default TablaRegistroProductos;