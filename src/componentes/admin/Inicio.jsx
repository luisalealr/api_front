import { useEffect, useState } from "react";
import TemplateAdmin from "./templates/TemplateAdmin";
import { getCountProducts, getProductosPorCategoria } from "../../services/ProductService";
import { getAllVentas } from "../../services/VentasService";
import ProductoPorCategoria from "./productos/ProductoPorCategoria";

export default function Inicio() {
    const [productos, setProductos] = useState('');
    const [ventas, setVentas] = useState('');
    const [categorias, setCategorias] = useState([]);

    const cantidadProductos = async () => {
        try {
            const resultado = await getCountProducts();
            if (resultado && resultado.length > 0) {
                setProductos(resultado[0].cantidad); 
            } else {
                setProductos(0); 
            }
        } catch (error) {
            console.error(error);
        }
    };

    const cantidadVentas = async () => {
        try {
            const resultado = await getAllVentas(); 
            let canti = 0;
            if (resultado && resultado.length > 0) {
                canti = resultado.length;
                setVentas(canti); 
            } else {
                setVentas(0);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const productoPorCategoria = async () => {
        try {
            const resultado = await getProductosPorCategoria(); 
            if (resultado && resultado.length > 0) {
                setCategorias(resultado); 
            } else {
                setCategorias(0); 
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        cantidadProductos();
        cantidadVentas();
        productoPorCategoria();
    }, []);

    return <>
        <TemplateAdmin>
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-2 min-h-[600px] max-h-fit justify-center w-[80%] mt-10">
                    <div className="flex flex-col h-[60%] justify-between items-center">
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] h-[160px] p-6 rounded-lg shadow">
                            <span className="text-xl font-bold mb-6">Productos existentes</span>
                            <span className="text-4xl font-bold">{productos}</span>
                        </div>
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] h-[160px] p-6 rounded-lg shadow">
                            <span className="text-xl font-bold mb-6">Ventas</span>
                            <span className="text-4xl font-bold">{ventas}</span>
                        </div>
                    </div>
                    <div className="flex flex-col w-full items-center">
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] max-h-fit min-h-[360px] p-6 rounded-lg shadow">
                            <span className="text-xl font-bold mb-6">Productos por categoría</span>
                            <div className="flex flex-row">
                                {categorias.map((categoria, index) => (
                                    <ProductoPorCategoria
                                        key={index}
                                        categoria={categoria.name_categoria}
                                        cantidadProductos={categoria.cantidad}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TemplateAdmin>
    </>
}