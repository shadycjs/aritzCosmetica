import { useSession } from "../../context/SessionContext";
import React, { useState } from "react";
import styles from "./Auth.module.css";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import axiosInstance from "../../api/axiosConfig";

function Auth() {
    const { screenLogIn, screenIn, screenOut } = useSession();

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
            alert(response.data || 'Login exitoso');
            // Redirige o guarda token
        } catch (error) {
            console.error('Error en login:', error.response);
            alert(error.response?.data || 'Error en login. Revisa tus credenciales.');
        }
    };

    return (
        <CenteredContainer>
            <div className={styles.container}>
                <h2 className={styles.title}>{isVerifying ? "Verifica tu cuenta" : (screenLogIn ? "Inicia Sesión" : "Regístrate")}</h2>
                {isVerifying ? (
                    <form onSubmit={handleVerify} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="code">Código de verificación:</label>
                            <input
                                type="text"
                                id="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Código de verificación"
                                required
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Verificar</button>
                    </form>
                ) : (
                    <form onSubmit={screenLogIn ? handleLogin : handleRegister} className={styles.form}>
                        {isRegister && (
                            <>
                                <div className={styles.formGroup}>
                                    <label htmlFor="name">Nombre:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="surname">Apellido:</label>
                                    <input
                                        type="text"
                                        id="surname"
                                        name="surname"
                                        value={formData.surname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phoneNumber">Teléfono:</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="address">Dirección:</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {isRegister && (
                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <button type="submit" className={styles.submitButton}>
                            {screenLogIn ? "Iniciar Sesión" : "Crear Cuenta"}
                        </button>
                    </form>
                )}
                <p className={styles.toggleText}>
                    {screenLogIn ? (
                        <>
                            ¿No tienes cuenta?{" "}
                            <button onClick={() => { screenOut(); setIsRegister(true); }} type="button" className={styles.toggleButton}>
                                Regístrate
                            </button>
                        </>
                    ) : (
                        <>
                            ¿Ya tienes cuenta?{" "}
                            <button onClick={() => { screenIn(); setIsRegister(false); }} type="button" className={styles.toggleButton}>
                                Inicia Sesión
                            </button>
                        </>
                    )}
                </p>
            </div>
        </CenteredContainer>
    );
}

export default Auth;