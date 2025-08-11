import React, { createContext, useState, useContext } from "react";

// Crea el contexto inicial
const SessionContext = createContext();

// Este será tu componente proveedor para envolver toda la app
export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
    const [user, setUser] = useState(null); // Información del usuario
    const [token, setToken] = useState(null); // Token de autenticación
    const [screenLogIn, setScreenLogIn] = useState(false);

    // Función para iniciar sesión
    const login = (userData, authToken) => {
        setIsLoggedIn(true);
        setUser(userData);
        setToken(authToken);
    };

    // Función para cerrar sesión
    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
    };

    // Funcion para cambiar pantalla de logueo
    const screenIn = () => {
        setScreenLogIn(true);
    };

    // Funcion para cambiar pantalla de registro
    const screenOut = () => {
        setScreenLogIn(false);
    };

    // Valor que proporciona el contexto
    const value = {
        isLoggedIn,
        user,
        token,
        login,
        logout,
        screenLogIn,
        screenIn,
        screenOut,
    };

    return (
        <SessionContext.Provider value={value}>
            {children} {/* Componente hijo envuelto (toda la app) */}
        </SessionContext.Provider>
    );
};

// Custom Hook para usar el contexto más fácilmente
export const useSession = () => {
    return useContext(SessionContext);
};