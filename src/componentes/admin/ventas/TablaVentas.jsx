export default function TablaVentas({ facturaId, numeroFactura, fecha, cantidadProductos, precioTotal, productos }) {
    return<>
        <div className="flex flex-col">
            <div className="factura">
                <h2>Factura: {numeroFactura}</h2>
                <p>Fecha: {fecha}</p>
                <p>Cantidad de Productos: {cantidadProductos}</p>
                <p>Precio Total: ${precioTotal}</p>
                <table className="productos">
                    <thead>
                    <tr>
                        <th>Número de Producto</th>
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
                <hr />
            </div>
        </div>
    </>
    
}