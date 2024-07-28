import TemplateVendedor from "../templates/TemplateVendedor";
import { IoSearch } from "react-icons/io5";
import TablaRegistroProductos from "./TablaRegistroProductos";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProduct } from "../../../services/ProductService";
import 'react-toastify/dist/ReactToastify.css';
import { crearVenta } from "../../../services/VentasService";

const RegistrarVentas = () => {
  const [products, setProducts] = useState([]);
  const [buscarId, setBuscarId] = useState('');
  const [cantidad, setCantidad] = useState(1); 
  const [precioTotal, setPrecioTotal] = useState(''); 
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cantidadAEliminar, setCantidadAEliminar] = useState(1);
  const [productoEliminar, setProductoEliminar] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');
  
  useEffect(
    ()=>{
      calcularValorTotal()
    },[products]
  )

  //funcion de busqueds  
  const agregarProducto = async () => {
    const producto = await getProduct(buscarId);
    if (producto) {
      let flag = false;
      let aux = products;
      aux.forEach((p) => {
        if(producto.id_producto == p.id_producto){
          flag = true;
          p.cantidad += Number(cantidad);
          p.precioT = (p.cantidad*p.precio_unitario);
          setBuscarId('');
          calcularValorTotal()
          setCantidad(1);
        }
      });
      if(flag == false){
        const precioT = (cantidad*producto.precio_unitario);
        const productoConCantidad = { ...producto, cantidad, precioT }; 
        setProducts([...products, productoConCantidad]);
        setBuscarId('');
        setCantidad(1);
      }else{
        setProducts(aux);
      }
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

  const cancelarVenta = () => {
    setProducts([]);
    setNombreCliente('');
  };

  const handleProductSelect = (productId) => {
    if (selectedProductId == productId) {
      setSelectedProductId(null);
    } else {
      setSelectedProductId(productId);
    }
  };
  
  const cancelarProducto = async () =>{
    const producto = await getProduct(selectedProductId);
    setProductoEliminar(producto);
  }

  const eliminarProducto = () => {
    let aux = [...products];
    let productoEncontrado = false;
    aux = aux.map((p) => {
      if (p.id_producto == selectedProductId) {
        productoEncontrado = true;
        if (p.cantidad > cantidadAEliminar) {
          p.cantidad -= Number(cantidadAEliminar);
          p.precioT = p.cantidad * p.precio_unitario;
        } else {
          return null; // Marca el producto para eliminar
        }
      }
      return p;
    }).filter(p => p !== null); // Filtra productos marcados para eliminar
  
    if (!productoEncontrado) {
      alert('Producto no encontrado en la lista');
      return;
    }
    setProducts(aux);
    setBuscarId('');
    calcularValorTotal();
    setCantidad(1);
    setSelectedProductId(null);
    setCantidadAEliminar(1);
  };

  const validarFormulario = () => {
    let isValid = true;
    if (products.length === 0) {
        toast.error('Tienes que registrar al menos un producto a la compra');
        isValid = false;
    }
    if (!nombreCliente) {
        toast.error('Debe escribir el nombre del cliente');
        isValid = false;
    }
    return isValid;
};

  const registrarCompra =  (event) => {
    event.preventDefault();
    if (validarFormulario()) {
      const fecha = new Date().toISOString().split('T')[0]; 
      const data = {
        nombre_cliente: nombreCliente,
        fecha: fecha, 
        total: precioTotal,
        productos: products.map((product) => ({
            id_producto: product.id_producto,
            cantidad_producto: product.cantidad
        }))
      };
      //console.log('Datos a enviar:', JSON.stringify(data, null, 2));
      try {
        crearVenta(data);
        toast.success('Venta Registrada correctamente');
      } catch (error) {
        toast.error('Error al registrar la venta: ' + (error.response?.data?.message || error.message));
      }
      cancelarVenta();
    } 
  };

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
                        <th className="w-10"></th>
                        <th className="w-44">N° del producto</th>
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
                          numeroProducto={index+1}
                          codigoProducto={producto.id_producto}
                          nombre={producto.nombre}
                          cantidad={producto.cantidad}
                          precioUnitario={producto.precio_unitario}
                          precioTotal={producto.precioT}
                          isSelected={selectedProductId == producto.id_producto}
                          onProductSelect={() => handleProductSelect(producto.id_producto)}
                        />
                      ))}
                    </tbody>
                  </table>
              </div>
            </div>
            <div className="h-44">
              <hr className="h-[2px] opacity-45" color="#1E1E1E"/>
              <div className="text-sm mx-4 my-6 w-[35%] flex flex-row justify-evenly items-center">
                <label htmlFor="">Nombre del cliente:</label>
                <input
                  value={nombreCliente} 
                  type="text" 
                  onChange={(e) => setNombreCliente(e.target.value)}
                  className="w-[60%] text-sm h-8 border border-[#999999] shadow rounded-md"
                />
              </div>
              <div className="flex mt-4 flex-row w-full justify-around text-sm">
                <button onClick={cancelarVenta} className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Venta</button>
                <button onClick={cancelarProducto} className="w-48 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cancelar Producto</button>
                <button onClick={registrarCompra} className="w-32 py-1 h-fit rounded-md shadow hover:bg-[#b0d144] bg-[#8DB600]">Cobrar</button>
                <div className="w-64 bg-[#D9D9D9] p-4 text-3xl">${precioTotal}</div>
              </div>
            </div>
          </div>
          {productoEliminar && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold">Eliminar Producto</h2>
                <p>¿Cuántos productos quieres eliminar?</p>
                <input
                  type="number"
                  min="1"
                  max={products.find(p => p.id_producto === selectedProductId)?.cantidad || 1}
                  value={cantidadAEliminar}
                  onChange={(e) => setCantidadAEliminar(Number(e.target.value))}
                  className="border p-2 rounded-md"
                />
                <div className="flex justify-end mt-4">
                  <button onClick={() => setProductoEliminar(null)} className="mr-2">Cancelar</button>
                  <button onClick={eliminarProducto}>Eliminar</button>
                </div>
              </div>
            </div>
          )}
      </TemplateVendedor>
  </>
}

export default RegistrarVentas;