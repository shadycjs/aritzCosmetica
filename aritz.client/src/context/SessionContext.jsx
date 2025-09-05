import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

// Crea el contexto inicial
const SessionContext = createContext();

// Este será tu componente proveedor para envolver toda la app
export const SessionProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de autenticación
    const [screenLogIn, setScreenLogIn] = useState(true);
    const [isRegister, setIsRegister] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [email, setEmail] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '', // Nuevo campo para confirmación
        phoneNumber: '',
        address: ''
    });
    const [code, setCode] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUserName = localStorage.getItem('userName');
        if (token && storedUserName) {
            setIsLoggedIn(true);
            setUserName(storedUserName);
        }
    }, []);

    // Funcion para cambiar pantalla de logueo
    const screenIn = () => {
        setScreenLogIn(true);
    };

    // Funcion para cambiar pantalla de registro
    const screenOut = () => {
        setScreenLogIn(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        try {
            await axiosInstance.post('auth/register', {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                address: formData.address
            });
            setEmail(formData.email);
            setIsVerifying(true);
            alert('Revisa tu email para el código.');
        } catch (error) {
            alert(error.response?.data?.Message || 'Error en registro');
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('auth/verify', { email, code });
            setIsVerifying(false);
            setIsRegister(false);
            screenIn();
            alert('Cuenta verificada. Ahora puedes loguearte.');
        } catch (error) {
            alert(error.response?.data?.Message || 'Código inválido');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('auth/login', {
                email: formData.email,
                password: formData.password
            });
            // Almacenar token y nombre del usuario
            localStorage.setItem('authToken', response.data.Token);
            localStorage.setItem('userName', response.data.UserName);
            setIsLoggedIn(true);
            setUserName(response.data.UserName);
            alert(response.data.Message || 'Login exitoso');
            navigate('/');
            setIsLoggedIn(true);
            alert(response.data || 'Login exitoso');
        } catch (error) {
            console.error('Error en login:', error.response);
            alert(error.response?.data || 'Error en login. Revisa tus credenciales.');
        }
    };

    // Valor que proporciona el contexto
    const value = {
        isLoggedIn,
        setIsLoggedIn,
        screenLogIn,
        screenIn,
        screenOut,
        handleChange,
        handleRegister,
        handleVerify,
        handleLogin,
        isRegister,
        isVerifying,
        code,
        setCode,
        formData,
        setIsRegister,
        userName
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