import TemplateVendedor from "../templates/TemplateVendedor";
import { IoSearch } from "react-icons/io5";
import TablaRegistroProductos from "./TablaRegistroProductos";

const productos = [
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
  ];  

const RegistrarVentas = () => {

    return<>
        <TemplateVendedor>
            <div className="flex flex-col h-screen">
              <div className="flex flex-col flex-1 w-full">
                <div className="bg-[#D0F25E]">
                    <h2 className="py-2 px-6 font-semibold text-xl">Registrar Venta</h2>
                </div>
                <div className="w-full h-16 flex items-center">
                  <div className="w-full flex items-center">
                    <label htmlFor="">Código del producto:</label>
                    <div className="shadow-sm border border-[#999999] rounded-md flex flex-row items-center">
                      <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1"/>
                      <input type="text" placeholder="Buscar venta" className="h-8 border-none rounded-md" />
                    </div>
                    <button className="w-[28px] h-[28px] border-2 border-black rounded-full text-xl font-bold justify-center flex items-center bg-[#D0F25E]">+</button>
                  </div>
                  <div>

                  </div>
                </div>
                <div className="bg-[#D0F25E] h-6 w-full"></div>
                <table>
                  <thead className="bg-[#95A09D] text-left">
                    <tr >
                      <th>N° del producto</th>
                      <th>Código</th>
                      <th>Nombre</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {productos.map((producto, index) => (
                      <TablaRegistroProductos
                        key={index}
                        numeroProducto={producto.numeroProducto}
                        codigoProducto={producto.codigoProducto}
                        nombre={producto.nombre}
                        cantidad={producto.cantidad}
                        precioUnitario={producto.precioUnitario}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="h-40">
                <hr className="h-[2px] opacity-45" color="#1E1E1E"/>
                <div className="flex mt-4 flex-row w-full justify-around">
                  <button className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Venta</button>
                  <button className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Producto</button>
                  <button className="w-32 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cobrar</button>
                  <div className="w-64 bg-[#D9D9D9] p-6 text-3xl">$125</div>
                </div>
              </div>
            </div>
        </TemplateVendedor>
    </>
}

export default RegistrarVentas;