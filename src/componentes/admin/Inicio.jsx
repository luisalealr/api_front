import { useEffect, useState } from "react";
import TemplateAdmin from "./templates/TemplateAdmin";
import { getCountProducts, getProductosPorCategoria } from "../../services/ProductService";
import { getAllVentas, getVentasDelDia } from "../../services/VentasService";
import ProductoPorCategoria from "./productos/ProductoPorCategoria";
import { DateTime } from "luxon";

export default function Inicio() {
    const [productos, setProductos] = useState('');
    const [ventas, setVentas] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [facturas, setFacturas] = useState([]);

    useEffect(() => { 
        obtenerDatosIniciales();
    }, []);

    useEffect(() => {
        cantidadVentasDelDia();
        productoPorCategoria();
        cantidadProductos();
    }, [facturas]);

    const obtenerDatosIniciales = async () => {
        try {
            const ventasData = await getAllVentas();
            if (ventasData && Array.isArray(ventasData)) {
                setFacturas(ventasData);
            } else {
                console.error('Data no es un array');
            }
        } catch (error) {
            console.error('Error al obtener los datos iniciales:', error);
        }
    };

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

    const cantidadVentasDelDia = async () => {
        let canti = 0;
        const dateInBogota = DateTime.now().setZone('America/Bogota');
        const fecha = dateInBogota.toFormat('yyyy-MM-dd');
        const ventasActuales = await getVentasDelDia(fecha,fecha);
        if(ventasActuales){
            canti = ventasActuales.length;
            setVentas(canti);
        } else {
            setVentas(0);
        }
    };

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
    
    return <>
        <TemplateAdmin>
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-2 min-h-[600px] max-h-fit justify-center w-[90%] mt-10 ml-10">
                    <div className="flex flex-col w-full items-center">
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] max-h-fit min-h-[360px] p-6 rounded-lg shadow mb-10">
                            <span className="text-xl font-bold mb-6">Productos por categoría</span>
                            <div className="flex flex-col">
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
                    <div className="flex flex-col h-[360px] justify-between items-center">
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] h-[160px] p-6 rounded-lg shadow">
                            <span className="text-xl font-bold mb-6">Productos existentes</span>
                            <span className="text-4xl font-bold">{productos}</span>
                        </div>
                        <div className="flex flex-col bg-[#D0F25E] w-[70%] h-[160px] p-6 rounded-lg shadow">
                            <span className="text-xl font-bold mb-6">Ventas del día</span>
                            <span className="text-4xl font-bold">{ventas}</span>
                        </div>
                    </div>
                </div>
            </div>
        </TemplateAdmin>
    </>
}