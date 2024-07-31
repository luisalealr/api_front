import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ allowedRoles }) => {
    const { auth } = useAuth();

    if (!auth.token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(auth.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
