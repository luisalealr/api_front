/* eslint-disable react/prop-types */
const ProductoPorCategoria = ({ categoria, cantidadProductos}) => {
    return<>
        <span className="text-2xl font-bold mr-2">{categoria}:</span>
        <span className="text-2xl font-bold">{cantidadProductos}</span>
    </>
}

export default ProductoPorCategoria;