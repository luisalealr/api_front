import './App.css'
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideBar from './componentes/admin/templates/Sidebar';
import SideBarVendedor from './componentes/vendedor/templates/SidebarVendedor';
import InicioSesion from './componentes/InicioSesion';
import VerVentas from './componentes/admin/ventas/VerVentas';
import RegistrarVentas from './componentes/vendedor/ventas/RegistrarVentas';
import CrearCategoria from './componentes/admin/categorias/CrearCategoria';
import EditarProducto from './componentes/admin/productos/EditarProducto';
import RegistrarProducto from './componentes/admin/productos/RegistrarProducto';
import CrearProve from './componentes/admin/proveedores/CrearProve';
import EditarProve from './componentes/admin/proveedores/EditarProve';
import ListarCategorias from './componentes/admin/categorias/ListarCategorias';
import EditarCategoria from './componentes/admin/categorias/EditarCategoria';
import Inicio from './componentes/admin/Inicio';
import VerVentasVen from './componentes/vendedor/ventas/VerVentas';
import ListarProveedores from './componentes/admin/proveedores/ListarProve';
import TablaProve from './componentes/admin/proveedores/TablaProve';
import ListarProductos from './componentes/admin/productos/ListarProductos';
import Unauthorized from "./componentes/Unauthorized";
import { AuthProvider } from "./componentes/AuthProvider";
import PrivateRoute from "./componentes/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PrivateRoute allowedRoles={['Administrador']} />}>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/login" element={<InicioSesion />} />
            <Route path="/menu" element={<SideBar />} />
            <Route path="/registrar_categoria" element={<CrearCategoria />} />
            <Route path="/ver_ventas" element={<VerVentas />} />
            <Route path="/crear_proveedor" element={<CrearProve />} />
            <Route path="/editar_proveedor/:id" element={<EditarProve />} />
            <Route path="/editar_producto" element={<EditarProducto />} />
            <Route path="/registrar_producto" element={<RegistrarProducto />} />
            <Route path="/ver_categorias" element={<ListarCategorias />} />
            <Route path="/editar_categoria/:id" element={<EditarCategoria />} />
            <Route path='/listar_proveedores' element={<ListarProveedores />} />
            <Route path='/tabla_proveedores' element={<TablaProve />} />
            <Route path='/listar_productos' element={<ListarProductos />} />
          </Route>
          <Route element={<PrivateRoute allowedRoles={['Vendedor']} />}>
            <Route path="/inicio_vendedor" element={<SideBarVendedor />} />
            <Route path="/registrar_venta" element={<RegistrarVentas />} />
            <Route path='/ver_ventas_ven' element={<VerVentasVen />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
