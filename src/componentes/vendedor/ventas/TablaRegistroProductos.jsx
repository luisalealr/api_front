/* eslint-disable react/prop-types */
const TablaRegistroProductos = ({ numeroProducto, codigoProducto, nombre, cantidad, precioUnitario }) => {
    return<>
        <tr className='text-left h-8 align-middle'>
            <td>{numeroProducto}</td>
            <td>{codigoProducto}</td>
            <td>{nombre}</td>
            <td>{cantidad}</td>
            <td>${precioUnitario}</td>
        </tr>
        <tr>
            <td colSpan="6">
                <hr />
            </td>
        </tr>
    </>

}

export default TablaRegistroProductos;