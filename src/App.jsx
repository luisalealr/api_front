// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, /*Navigate*/ } from 'react-router-dom';
import Inicio from './Inicio';
import SideBar from './componentes/admin/templates/Sidebar';
import SideBarVendedor from './componentes/vendedor/templates/SidebarVendedor';
import InicioSesion from './componentes/InicioSesion';


function App() {
  //const { user } = useUser();
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio/>} />    
          <Route path="/login" element={<InicioSesion/>} />   
          <Route path="/menu" element={<SideBar/>} />   
          <Route path="/menu_vendedor" element={<SideBarVendedor/>}/> 
        </Routes>
      </div>
    </Router>
  );
}
export default App
