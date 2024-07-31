import {HiMiniArrowPathRoundedSquare} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./AuthProvider";
import { logoutApi } from "../services/UsuarioService";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logoutApi();
        toast.success('Regesando al inicio');
        logout(); // Usa el contexto de autenticación
        window.history.replaceState(null, '', '/nueva_esperanza/');
        navigate('/login');
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <img src="/nueva_esperanza/img/error.png" alt="Error" className="mx-auto mb-4 w-1/3 h-auto" />
                <h1 className="text-3xl font-bold text-red-500 mb-4">Acceso no autorizado</h1>
                <button onClick={handleLogout}><HiMiniArrowPathRoundedSquare className="text-2xl"/></button>
            </div>
        </div>
    );
};

export default Unauthorized;
