import { useEffect, useState } from "react";
import TemplateAdmin from "./templates/TemplateAdmin";
import { getCountProducts, getProductosPorCategoria } from "../../services/ProductService";
import { getAllVentas } from "../../services/VentasService";
import ProductoPorCategoria from "./productos/ProductoPorCategoria";

export default function Inicio() {
    const [productos, setProductos] = useState('');
    const [ventas, setVentas] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [facturas, setFacturas] = useState([]);

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

    const cantidadVentasDelDia = () => {
        let canti = 0;
        if (facturas && facturas.length > 0) {
            const fechaActual = new Date();
            const fechaActualLocal = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate()); 
            const fechaFormato = fechaActualLocal.toISOString().slice(0, 10); 
            console.log(fechaFormato)   
            const filteredResults = facturas.filter(venta => {
                const fechaVentaFormato = new Date(venta.fecha).toISOString().slice(0, 10);
                console.log(fechaVentaFormato)
                return fechaFormato === fechaVentaFormato;
            });
            canti = filteredResults.length;
            setVentas(canti);
        } else {
            setVentas(0);
        }
        console.log('Cantidad de Ventas:', canti);
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

    useEffect(() => { 
        cantidadProductos();
        cantidadVentasDelDia();
        productoPorCategoria();
        getAllVentas().then(data => {
            if (data && Array.isArray(data)) {
              setFacturas(data);// Inicialmente muestra todas las ventas
            } else {
              console.error('Data no es un array');
            }
          }).catch(error => {
            console.error('Error al obtener las ventas:', error);
          });
    }, []);

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