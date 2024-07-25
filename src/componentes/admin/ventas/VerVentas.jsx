import TemplateAdmin from "../templates/TemplateAdmin";
import TablaVentas from "./TablaVentas";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";

const facturas = [
    {
      numeroFactura: 'F001',
      fecha: '2024-07-23',
      cantidadProductos: 3,
      precioTotal: 75.50,
      productos: [
        {
          numeroProducto: 1,
          nombre: 'Paracetamol',
          codigoProducto: 'P001',
          cantidad: 1,
          precioUnitario: 15.50
        },
        {
          numeroProducto: 2,
          nombre: 'Ibuprofeno',
          codigoProducto: 'P002',
          cantidad: 2,
          precioUnitario: 10.00
        },
        {
          numeroProducto: 3,
          nombre: 'Aspirina',
          codigoProducto: 'P003',
          cantidad: 3,
          precioUnitario: 10.00
        }
      ]
    },
    {
      numeroFactura: 'F002',
      fecha: '2024-07-22',
      cantidadProductos: 2,
      precioTotal: 40.00,
      productos: [
        {
          numeroProducto: 1,
          nombre: 'Amoxicilina',
          codigoProducto: 'P004',
          cantidad: 1,
          precioUnitario: 20.00
        },
        {
          numeroProducto: 2,
          nombre: 'Loratadina',
          codigoProducto: 'P005',
          cantidad: 2,
          precioUnitario: 10.00
        }
      ]
    },
    {
      numeroFactura: 'F003',
      fecha: '2024-07-21',
      cantidadProductos: 4,
      precioTotal: 90.00,
      productos: [
        {
          numeroProducto: 1,
          nombre: 'Omeprazol',
          codigoProducto: 'P006',
          cantidad: 2,
          precioUnitario: 20.00
        },
        {
          numeroProducto: 2,
          nombre: 'Metformina',
          codigoProducto: 'P007',
          cantidad: 2,
          precioUnitario: 25.00
        },
        {
          numeroProducto: 3,
          nombre: 'Vitamina C',
          codigoProducto: 'P008',
          cantidad: 2,
          precioUnitario: 10.00
        }
      ]
    },
    {
      numeroFactura: 'F004',
      fecha: '2024-07-20',
      cantidadProductos: 5,
      precioTotal: 120.00,
      productos: [
        {
          numeroProducto: 1,
          nombre: 'Acetaminofén',
          codigoProducto: 'P009',
          cantidad: 3,
          precioUnitario: 15.00
        },
        {
          numeroProducto: 2,
          nombre: 'Diclofenaco',
          codigoProducto: 'P010',
          cantidad: 1,
          precioUnitario: 20.00
        },
        {
          numeroProducto: 3,
          nombre: 'Ranitidina',
          codigoProducto: 'P011',
          cantidad: 2,
          precioUnitario: 10.00
        }
      ]
    }
  ];  

const VerVentas = () => {

  console.log(facturas)

    return<>
        <TemplateAdmin>
            <div className="flex flex-col">
              <div className="bg-[#D0F25E]">
                  <h2 className="py-2 px-6 font-semibold text-xl">Ventas</h2>
              </div>
              <div className="w-full h-16 flex items-center">
                <div className="flex flex-row w-[90px] mx-9 py-1 border border-black justify-center items-center rounded-md cursor-pointer">
                  <HiFilter color="rgba(141, 182, 0, 0.79)" fontSize={25}/>
                  <h5>Filtrar</h5>
                </div>
                <div className="border border-black rounded-md flex flex-row items-center">
                  <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1"/>
                  <input type="text" placeholder="Buscar venta" className="h-8 border-none rounded-md" />
                </div>
              </div>
              <div className="bg-[#D0F25E] h-6 w-full">
              </div>
              <table>
                <thead className="bg-[#95A09D]">
                  <tr>
                    <th></th>
                    <th>N° de la venta</th>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
              
              <tbody>
                  {facturas.map((factura, index) => (
                      <TablaVentas
                          key={index}
                          facturaId={factura.id}
                          numeroFactura={factura.numeroFactura}
                          fecha={factura.fecha}
                          cantidadProductos={factura.cantidadProductos}
                          precioTotal={factura.precioTotal}
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