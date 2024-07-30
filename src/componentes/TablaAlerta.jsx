import ProductosFaltantes from "./admin/productos/ProductosFaltantes";
import { IoClose } from "react-icons/io5";

/* eslint-disable react/prop-types */
const TablaAlerta = ({ mostrar, productos }) => {
    return (
        <>
            <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="flex flex-col w-[800px] max-h-[380px] bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-[#221d0c] p-1 flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center">
                                <div className="bg-[#F2C94C] p-4 h-6 w-6 rounded-full flex justify-center items-center my-[2px] mr-3 ml-1">
                                    <span className="text-xl text-white font-bold">!</span>
                                </div>
                                <span className="text-lg text-white">Los siguientes productos se encuentran en stock mínimo: </span>
                            </div>
                            <div>
                                <button onClick={mostrar} className="text-white text-xl"><IoClose /></button>
                            </div>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <table className="min-w-full">
                                <thead className="bg-[#F2C94C] sticky text-left">
                                    <tr>
                                        <th className="w-[18%]">N° del producto</th>
                                        <th className="w-[35%]">Nombre</th>
                                        <th className="w-[25%]">Categoría</th>
                                        <th className="w-[22%]">Proveedor</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {productos.map((producto, index) => (
                                        <ProductosFaltantes
                                            key={index}
                                            productoId={producto.id_producto}
                                            nombre={producto.nombre}
                                            categoria={producto.categoria.descripcion}
                                            proveedor={producto.proveedor.nombre}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TablaAlerta;