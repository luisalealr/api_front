/* eslint-disable react/prop-types */
const ProductosFaltantes = ({ productoId, nombre,  categoria, proveedor }) => {

    const capitalizarPrimeraLetra = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    return<>
        <tr className='text-left h-8 align-middle'>
            <td>{productoId}</td>
            <td>{capitalizarPrimeraLetra(nombre)}</td>
            <td>{capitalizarPrimeraLetra(categoria)}</td>
            <td>{capitalizarPrimeraLetra(proveedor)}</td>
        </tr>
        <tr>
            <td colSpan="4">
                <hr className="border-[#B9A158]"/>
            </td>
        </tr>
    </>

}

export default ProductosFaltantes;