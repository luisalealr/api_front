import { useEffect, useState } from "react";
import TablaVentas from "./admin/ventas/TablaVentas";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { getAllVentas } from "../services/VentasService";
import { toast } from "react-toastify";

const Ventas = () => {
  const [facturas, setFacturas] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [buscarDesc, setBuscarDesc] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [results, setResults] = useState([]);

  const obtenerFacturas = () => {
    getAllVentas()
      .then(data => {
        if (data && Array.isArray(data)) {
          setFacturas(data);
          filtrarPorDiaActual(data); // Filtrar las ventas del día actual
        } else {
          console.error('Data no es un array');
        }
      })
      .catch(error => {
        console.error('Error al obtener las ventas:', error);
      });
  };

  const filtrar = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const buscador = (e) => {
    setBuscarDesc(e.target.value);
  };

  const filtrarPorFecha = () => {
    setIsFilterVisible(!isFilterVisible);
    if (!fechaInicio || !fechaFin) {
      setResults(facturas);
      return;
    }
    const fecha_1 = new Date(fechaInicio);
    const fecha_2 = new Date(fechaFin);
    const filteredResults = facturas.filter(venta => {
      const fechaVenta = new Date(venta.fecha);
      return fechaVenta >= fecha_1 && fechaVenta <= fecha_2;
    });
    setResults(filteredResults);
    setFechaFin('');
    setFechaInicio('');
  };

  const filtrarPorDiaActual = (data) => {
    const fechaActual = new Date();
    const fechaActualLocal = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    const fechaFormato = fechaActualLocal.toISOString().slice(0, 10);
    const filteredResults = data.filter(venta => {
      const fechaVentaFormato = new Date(venta.fecha).toISOString().slice(0, 10);
      return fechaVentaFormato === fechaFormato;
    });
    if (filteredResults.length > 0) {
      setResults(filteredResults);
    } else {
      toast.info('No se han registrado ventas hoy');
      setResults([]);
    }
  };

  useEffect(() => {
    obtenerFacturas();
  }, []);

  let displayedResults = results;
  if (buscarDesc) {
    displayedResults = results.filter(dato => dato.id_compra == buscarDesc);
  }

  return (
      <div className="flex flex-col">
        <div className="bg-[#D0F25E]">
          <h2 className="py-2 px-6 font-semibold text-xl">Ventas</h2>
        </div>
        <div className="w-full h-16 flex items-center">
          <div className="flex flex-col ">
            <div  onClick={filtrar} className="w-fit shadow-sm flex flex-row px-2 mx-9 py-1 border border-[#999999] justify-center items-center rounded-md cursor-pointer">
              <HiFilter color="rgba(141, 182, 0, 0.79)" fontSize={25}/>
              <h5>Filtro</h5>
            </div>
            {isFilterVisible && (
              <div className="border border-[#999999] absolute left-80 top-24 mt-2 w-auto flex flex-col text-sm bg-gray-200 py-2 px-6 rounded-md shadow-xl">
                <div className="flex flex-col">
                  <h5>Fecha</h5>
                  <label htmlFor="">Primera Fecha</label>
                  <input 
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)} 
                    className="rounded-md border-none shadow  h-5 text-sm w-32" 
                    type="date" 
                  />
                  <label htmlFor="">Segunda Fecha</label>
                  <input 
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)} 
                    className="rounded-md border-none shadow  h-5 text-sm w-32" 
                    type="date" 
                  />
                </div>
                <button 
                  onClick={filtrarPorFecha}
                  className="w-fit shadow-sm rounded-md py-[2px] border mt-2 border-[#999999] bg-white px-2"
                >Aceptar</button>
              </div>
            )}
          </div>
          <div className="shadow-sm border border-[#999999] rounded-md flex flex-row items-center">
            <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1"/>
            <input
              type="text" 
              placeholder="Buscar venta" 
              value={buscarDesc}
              onChange={buscador}
              className="h-8 border-none rounded-md" 
            />
          </div>
        </div>
        <div className="bg-[#D0F25E] h-6 w-full"></div>
        <table>
          <thead className="bg-[#95A09D] text-left">
            <tr >
              <th></th>
              <th>N° de la venta</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody> 
            {displayedResults.map((factura, index) => (
              <TablaVentas
                key={index}
                facturaId={factura.id_compra}
                cliente={factura.nombre_cliente}
                fecha={factura.fecha}
                cantidadProductos={factura.cantidadProductos}
                precioTotal={factura.total}
                productos={factura.productos}
              />
            ))}
          </tbody>
        </table>
      </div>
  );
}

export default Ventas;
