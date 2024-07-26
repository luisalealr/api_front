/* eslint-disable react/prop-types */
const TablaRegistroProductos = ({ numeroProducto, codigoProducto, nombre, cantidad, precioUnitario, precioTotal, isSelected, onProductSelect  }) => {
    return<>
        <tr className={`text-left h-8 align-middle ${isSelected ? "bg-gray-100" : ""}`} >
            <th>
                <input
                    type="checkbox"
                    value={numeroProducto}
                    className="m-2"
                    checked={isSelected}
                    onChange={onProductSelect}
                />
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