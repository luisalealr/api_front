import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Inicio from './Inicio';
import SideBar from './componentes/admin/templates/Sidebar';
import SideBarVendedor from './componentes/vendedor/templates/SidebarVendedor';
import InicioSesion from './componentes/InicioSesion';
import VerVentas from './componentes/admin/ventas/VerVentas';
import RegistrarVentas from './componentes/vendedor/ventas/RegistrarVentas';
import CrearCategoria from './componentes/admin/categorias/CrearCategoria';
import EditarProducto from './componentes/admin/productos/EditarProducto';
import RegistrarProducto from './componentes/admin/productos/RegistrarProducto';
import GuardarProve from './componentes/admin/proveedores/GuardarProve';
import EditarProve from './componentes/admin/proveedores/EditarProve';
import ListarCategorias from './componentes/admin/categorias/ListarCategorias';


function App() {

  return (
    <Router>
      <div className="app-container">
        <Routes> 
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<InicioSesion />} />
          <Route path="/menu" element={<SideBar />} />
          <Route path="/menu_vendedor" element={<SideBarVendedor />} />
          <Route path="/registrar_categoria" element={<CrearCategoria />} />
          <Route path="/ver_ventas" element={<VerVentas />} />
          <Route path="/registrar_venta" element={<RegistrarVentas />} />
          <Route path="/guardar_proveedor" element={<GuardarProve />} />
          <Route path="/editar_proveedor" element={<EditarProve />} />
          <Route path="/editar_producto" element={<EditarProducto />} />
          <Route path="/registrar_producto" element={<RegistrarProducto />} />
          <Route path="/ver_categorias" element={<ListarCategorias />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
