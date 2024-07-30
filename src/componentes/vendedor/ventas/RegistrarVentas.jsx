import { useEffect, useState } from "react";
import axios from 'axios';
import TemplateVendedor from "../templates/TemplateVendedor";
import { IoSearch } from "react-icons/io5";
import TablaRegistroProductos from "./TablaRegistroProductos";
import { toast } from "react-toastify";
import { getProduct, getProductName, getProductSuggest } from "../../../services/ProductService";
import 'react-toastify/dist/ReactToastify.css';
import { crearVenta } from "../../../services/VentasService";

const RegistrarVentas = () => {
  const [products, setProducts] = useState([]);
  const [buscar, setBuscar] = useState('');
  const [sugerencias, setSugerencias] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [precioTotal, setPrecioTotal] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [cantidadAEliminar, setCantidadAEliminar] = useState(1);
  const [productoEliminar, setProductoEliminar] = useState('');
  const [nombreCliente, setNombreCliente] = useState('');

  useEffect(() => {
    calcularValorTotal();
  }, [products]);

  useEffect(() => {
    if (buscar.trim().length > 0) {
      const fetchSuggestions = async () => {
        const suggestions = await getProductSuggest(buscar);
        setSugerencias(suggestions.slice(0, 7));
      };
      fetchSuggestions();
    } else {
      setSugerencias([]);
    }
  }, [buscar]);

  const agregarProducto = async () => {
    let producto = null;

    if (!isNaN(buscar)) {
      producto = await getProduct(buscar);
    }

    if (!producto) {
      producto = await getProductName(buscar);
    }

    if (producto) {
      if (producto.cantidad > 0) {
        let existe = false;
        let aux = [...products];

        aux.forEach((p) => {
          if (producto.id_producto === p.id_producto) {
            existe = true;
            const canti = Number(p.cantidad) + Number(cantidad);
            if (canti <= producto.cantidad) {
              p.cantidad = canti;
              p.precioT = p.cantidad * p.precio_unitario;
              setBuscar('');
              calcularValorTotal();
              setCantidad(1);
            } else {
              toast.warn('No hay suficientes existencias de este producto');
            }
          }
        });

        if (!existe) {
          if (cantidad <= producto.cantidad) {
            const precioT = cantidad * producto.precio_unitario;
            const productoConCantidad = { ...producto, cantidad, precioT };
            setProducts([...products, productoConCantidad]);
            setBuscar('');
            setCantidad(1);
          } else {
            toast.warn('No hay suficientes existencias de este producto');
          }
        } else {
          setProducts(aux);
        }
      } else {
        toast.warn('No hay existencias de este producto');
      }
    } else {
      toast.warn('Producto no encontrado');
    }
  };

  function calcularValorTotal() {
    let sumita = 0;
    for (const product of products) {
      sumita += product.precioT;
    }
    setPrecioTotal(sumita);
  }

  const cancelarVenta = () => {
    setProducts([]);
    setNombreCliente('');
  };

  const handleProductSelect = (productId) => {
    if (selectedProductId === productId) {
      setSelectedProductId(null);
    } else {
      setSelectedProductId(productId);
    }
  };

  const cancelarProducto = async () => {
    const producto = await getProduct(selectedProductId);
    setProductoEliminar(producto);
  };

  const eliminarProducto = () => {
    let aux = [...products];
    let productoEncontrado = false;
    aux = aux.map((p) => {
      if (p.id_producto === selectedProductId) {
        productoEncontrado = true;
        if (p.cantidad > cantidadAEliminar) {
          p.cantidad -= Number(cantidadAEliminar);
          p.precioT = p.cantidad * p.precio_unitario;
        } else {
          return null;
        }
      }
      return p;
    }).filter(p => p !== null);

    if (!productoEncontrado) {
      alert('Producto no encontrado en la lista');
      return;
    }
    setProducts(aux);
    setBuscar('');
    calcularValorTotal();
    setCantidad(1);
    setSelectedProductId(null);
    setCantidadAEliminar(1);
    setProductoEliminar(null);
  };

  const validarFormulario = () => {
    let isValid = true;
    if (products.length === 0) {
      toast.error('Tienes que registrar al menos un producto a la compra');
      isValid = false;
    } else if (!nombreCliente) {
      toast.error('Debe escribir el nombre del cliente');
      isValid = false;
    }
    return isValid;
  };

  const registrarCompra = (event) => {
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
      try {
        crearVenta(data);
        toast.success('Venta Registrada correctamente');
      } catch (error) {
        toast.error('Error al registrar la venta: ' + (error.response?.data?.message || error.message));
      }
      cancelarVenta();
    }
  };

  return (
    <>
      <TemplateVendedor>
        <div className="flex flex-col h-screen">
          <div className="flex flex-col flex-1 w-full">
            <div className="bg-[#D0F25E]">
              <h2 className="py-2 px-6 font-semibold text-xl">Registrar Venta</h2>
            </div>
            <div className="w-full h-16 flex flex-row items-center text-sm">
              <div className="w-[46%] px-6 flex flex-row justify-between items-center relative">
                <label htmlFor="">Código del producto:</label>
                <div className="w-[60%] shadow-sm border border-[#999999] rounded-md flex flex-row items-center relative">
                  <IoSearch color="rgba(141, 182, 0, 0.79)" fontSize={25} className="m-1" />
                  <input
                    value={buscar}
                    onChange={(e) => setBuscar(e.target.value)}
                    type="text" placeholder="Buscar producto"
                    className="w-full text-sm h-8 border-none rounded-md"
                  />
                  {sugerencias.length > 0 && (
                    <div className="absolute top-9 bg-white border border-gray-300 shadow-lg w-full max-h-60 overflow-y-auto rounded-md z-10">
                      {sugerencias.map((sug, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setBuscar(`${sug.nombre}`);
                            setSugerencias([]);
                          }}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                        >
                          {sug.nombre} - {sug.peso}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={agregarProducto} className="w-[28px] h-[28px] border-2 border-black rounded-full text-xl font-bold justify-center flex items-center bg-[#D0F25E]">+</button>
              </div>
              <div className="w-[20%] flex flex-row items-center justify-between px-6">
                <label htmlFor="">Cantidad:</label>
                <input
                  type="number"
                  min="1"
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
                      numeroProducto={index + 1}
                      codigoProducto={producto.id_producto}
                      nombre={producto.nombre}
                      cantidad={producto.cantidad}
                      precioUnitario={producto.precio_unitario}
                      precioTotal={producto.precioT}
                      isSelected={selectedProductId === producto.id_producto}
                      onProductSelect={() => handleProductSelect(producto.id_producto)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="h-44">
            <hr className="h-[2px] opacity-45" color="#1E1E1E" />
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
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="flex flex-col bg-white h-[200px] w-[310px] px-4 py-3 rounded-lg shadow-md justify-evenly">
                <div className="flex flex-col h-[70%] justify-around">
                  <h2 className="text-lg font-semibold">Eliminar Producto</h2>
                  <p>¿Cuántos productos quieres eliminar?</p>
                  <input
                    type="number"
                    min="1"
                    max={products.find(p => p.id_producto === selectedProductId)?.cantidad || 1}
                    value={cantidadAEliminar}
                    onChange={(e) => setCantidadAEliminar(Number(e.target.value))}
                    className="border-none bg-gray-200 w-20 p-2 rounded-md shadow"
                  />
                </div>
                <div className="w-full flex flex-row justify-end mt-2">
                  <button
                    onClick={() => setProductoEliminar(null)}
                    className="w-24 hover:bg-[#b0d144] bg-[#8DB600] rounded-md py-1 mr-4 shadow"
                  >Cancelar
                  </button>
                  <button
                    onClick={eliminarProducto}
                    className="w-24 hover:bg-[#b0d144] bg-[#8DB600] rounded-md py-1 shadow"
                  >Eliminar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </TemplateVendedor>


    </>
  );
}

export default RegistrarVentas;
