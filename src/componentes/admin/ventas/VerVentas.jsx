import { useEffect, useState } from "react";
import TemplateAdmin from "../templates/TemplateAdmin";
import TablaVentas from "./TablaVentas";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { getAllVentas, getVentasPorFecha } from "../../../services/VentasService";
import { toast } from "react-toastify";

const VerVentas = () => {
  const [facturas, setFacturas] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [buscarDesc, setBuscarDec] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [resultsPorFecha, setResultsPorFecha] = useState([]);

  const filtrar = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    getAllVentas().then(data => {
      if (data && Array.isArray(data)) {
        setFacturas(data);
      } else {
        console.error('Data no es un array');
      }
    }).catch(error => {
      console.error('Error al obtener las ventas:', error);
    });
  }, []);

  const buscador = (e) => {
    setBuscarDec(e.target.value);
  }

  let results = []
  if (!buscarDesc) {
    results = facturas;
  } else {
    results = facturas.filter((dato) => dato.id_compra == buscarDesc)
  }
  
  //Búsqueda por fecha
    // if (resultsPorFecha.length != 0) {
    //     results = results.filter((factura) =>
    //     resultsPorFecha.some((result) => result.id_compra === factura.id_compra)
    //   )
    // }

  // const buscarPorFecha = async () => {
  //     const dataa = {
  //       fecha_inicio: fechaInicio,
  //       fecha_fin: fechaFin, 
  //     };
  //     console.log('Datos a enviar:', JSON.stringify(dataa, null, 2));
  //     try {
  //       const response = await getVentasPorFecha(dataa);
  //       setResultsPorFecha(response.data);
  //       console.log(JSON.stringify(response.data, null, 2))
  //       toast.success('Venta Registrada correctamente');
  //     } catch (error) {
  //       toast.error('Error al registrar la venta: ' + (error.response?.data?.message || error.message));
  //     }
  //     setIsFilterVisible(!isFilterVisible);
  //     //setFechaFin('');
  //     //setFechaInicio('');
  // }

  const buscarPorFecha = async () => {
    const dataa = {
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin, 
    };
    
    console.log('Datos a enviar:', JSON.stringify(dataa, null, 2));
    
    // Comprobar que las fechas sean válidas
    if (!fechaInicio || !fechaFin) {
        toast.error('Por favor, selecciona ambas fechas.');
        return;
    }
    
    try {
        const response = await getVentasPorFecha(dataa);
        
        if (response && response.length > 0) {
            setResultsPorFecha(response);
            console.log('Datos recibidos:', JSON.stringify(response, null, 2));
            toast.success('Ventas filtradas correctamente');
        } else {
            toast.info('No se encontraron ventas en este rango de fechas');
            setResultsPorFecha([]);
        }
    } catch (error) {
        toast.error('Error al filtrar las ventas: ' + (error.response?.data?.message || error.message));
    }
    
    setIsFilterVisible(!isFilterVisible);
    //setFechaFin('');
    //setFechaInicio('');
  }



  return<>
    <TemplateAdmin>
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
                  onClick={buscarPorFecha} 
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
            {results.map((factura, index) => (
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
    </TemplateAdmin>
  </>
}

export default VerVentas;