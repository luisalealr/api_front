import TemplateVendedor from "../templates/TemplateVendedor";
import { IoSearch } from "react-icons/io5";
import TablaRegistroProductos from "./TablaRegistroProductos";
import { useEffect, useState } from "react";
import { getProduct } from "../../../services/ProductService";

const RegistrarVentas = () => {

  const [products, setProducts] = useState([]);
  const [buscarId, setBuscarId] = useState('');
  const [cantidad, setCantidad] = useState(1); 
  const [precioTotal, setPrecioTotal] = useState(''); 
  
  useEffect(
    ()=>{
      calcularValorTotal()
    },[products]
  )

  //funcion de busqueds  
  const agregarProducto = async () => {
    const producto = await getProduct(buscarId);
    if (producto) {
      const precioT = (cantidad*producto.precio_unitario);
      const productoConCantidad = { ...producto, cantidad, precioT }; 
      setProducts([...products, productoConCantidad]);
      setBuscarId('');
      setCantidad(1);
    } else {
      alert('Producto no encontrado');
    }
  };

  function calcularValorTotal(){
    let sumita = 0; 
    for (const product of products) {
      sumita+=product.precioT;
    }
    setPrecioTotal(sumita);
  }

    return<>
        <TemplateVendedor>
            <div className="flex flex-col h-screen">
              <div className="flex flex-col flex-1 w-full">
                <div className="bg-[#D0F25E]">
                    <h2 className="py-2 px-6 font-semibold text-xl">Registrar Venta</h2>
                </div>
                <div className="w-full h-16 flex flex-row items-center text-sm">
                  <div className="w-[46%] px-6 flex flex-row justify-between items-center">
                    <label htmlFor="">Código del producto:</label>
                    <div className="w-[60%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center">
                      <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1"/>
                      <input 
                        value={buscarId} 
                        onChange={(e) => setBuscarId(e.target.value)} 
                        type="text" placeholder="Buscar producto" 
                        className="w-full text-sm h-8 border-none rounded-md"
                      />
                    </div>
                    <button onClick={agregarProducto} className="w-[28px] h-[28px] border-2 border-black rounded-full text-xl font-bold justify-center flex items-center bg-[#D0F25E]">+</button>
                  </div>
                  <div className="w-[20%] flex flex-row items-center justify-between px-6">
                    <label htmlFor="">Cantidad:</label>
                    <input
                      type="number" 
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      className="w-24 text-sm h-8 shadow-sm border border-[#999999] rounded-md" />
                  </div>
                </div>
                <div className="bg-[#D0F25E] h-6 w-full"></div>
                <div className="flex-1 overflow-auto max-h-[330px]">
                  <table className="min-w-full divide-y divide-gray-200 table-fixed text-sm">
                    <thead className="bg-[#95A09D] text-left">
                      <tr>
                        <th></th>
                        <th>N° del producto</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Precio Total</th>
                      </tr>
                    </thead>
                      <tbody>
                        {products.map((producto, index) => (
                          <TablaRegistroProductos
                            key={index}
                            numeroProducto={index}
                            codigoProducto={producto.id_producto}
                            nombre={producto.nombre}
                            cantidad={producto.cantidad}
                            precioUnitario={producto.precio_unitario}
                            precioTotal={producto.precioT}
                          />
                        ))}
                      </tbody>
                    </table>
                </div>
              </div>
              <div className="h-44">
                <hr className="h-[2px] opacity-45" color="#1E1E1E"/>
                <div className="text-sm mx-4 my-6 w-[35%] flex flex-row justify-evenly items-center">
                  <label htmlFor="">Nombre del cliente</label>
                  <input type="text" className="w-[60%] text-sm h-8 border border-[#999999] shadow rounded-md" />
                </div>
                <div className="flex mt-4 flex-row w-full justify-around text-sm">
                  <button className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Venta</button>
                  <button className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Producto</button>
                  <button className="w-32 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cobrar</button>
                  <div className="w-64 bg-[#D9D9D9] p-4 text-3xl">${precioTotal}</div>
                </div>
              </div>
            </div>
        </TemplateVendedor>
    </>
}

export default RegistrarVentas;