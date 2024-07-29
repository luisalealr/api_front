/* eslint-disable react/prop-types */
const ProductoPorCategoria = ({ categoria, cantidadProductos}) => {

    const capitalizarPrimeraLetra = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };


    return<>
    <div className="flex flex-row w-full mb-2">
        <span className="w-[80%] text-lg font-semibold mr-1 break-words text-pretty">{capitalizarPrimeraLetra(categoria)}:</span>
        <span className="text-lg w-[15%] font-semibold">{cantidadProductos}</span>
    </div>
        
    </>
}

export default ProductoPorCategoria;