import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Importar SweetAlert2

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
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const [pageCheckout, setPageCheckout] = useState('/cart');

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUserName = localStorage.getItem('userName');
        const storedUserId = localStorage.getItem('userId');
        if (token && storedUserName) {
            setIsLoggedIn(true);
            setUserName(storedUserName);
            setUserId(parseInt(storedUserId));
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
            Swal.fire({
              title: "Se envio el codigo de verificacion, por favor, revisa tu casilla de mail",
              showClass: {
                popup: `
                  animate__animated
                  animate__fadeInUp
                  animate__faster
                `
              },
              hideClass: {
                popup: `
                  animate__animated
                  animate__fadeOutDown
                  animate__faster
                `
              }
            });
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
            Swal.fire({
                title: "Cuenta verificada. Ahora puedes loguearte.",
                icon: "success",
                draggable: true
            });
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
            localStorage.setItem('userId', response.data.UserId.toString());
            setIsLoggedIn(true);
            setUserName(response.data.UserName);
            console.log(response.data.UserId);
            setUserId(parseInt(response.data.UserId));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Iniciaste sesion",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        } catch (error) {
            console.error('Error en login:', error.response);
            Swal.fire({
                icon: "error",
                title: "Error al iniciar sesion",
                text: "Credenciales invalidas",
            });
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
        userName,
        userId,
        setUserId,
        pageCheckout,
        setPageCheckout
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