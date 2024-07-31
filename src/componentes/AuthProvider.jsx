import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('authToken'),
        role: localStorage.getItem('userRole')
    });

    const login = (token, role) => {
        setAuth({ token, role });
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', role);
    };

    const logout = () => {
        setAuth({ token: null, role: null });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
