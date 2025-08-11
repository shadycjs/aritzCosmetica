import { useSession } from "../../context/SessionContext";
import React, { useState } from "react";
import styles from "./Auth.module.css";
import CenteredContainer from "../CenteredContainer/CenteredContainer";

function Auth() {

    const { screenLogIn, screenIn, screenOut } = useSession();

    return (
        <CenteredContainer>
            <div className={styles.container}>
                {/* Título dinámico */}
                <h2 className={styles.title}>{screenLogIn ? "Inicia Sesión" : "Regístrate"}</h2>

                {/* Formulario */}
                <form className={styles.form}>
                    {/* Campo de Email */}
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input type="email" id="email" name="email" required />
                    </div>

                    {/* Campo de Contraseña */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    {/* Si es registro, agregamos el campo de confirmación */}
                    {!screenLogIn && (
                        <div className={styles.formGroup}>
                            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />
                        </div>
                    )}

                    {/* Botón enviar */}
                    <button type="submit" className={styles.submitButton}>
                        {screenLogIn ? "Iniciar Sesión" : "Crear Cuenta"}
                    </button>
                </form>

                {/* Toggle entre Login y Registro */}
                <p className={styles.toggleText}>
                    {screenLogIn ? (
                        <>
                            ¿No tienes cuenta?{" "}
                            <button onClick={() => { screenOut() }} type="button" className={styles.toggleButton}>
                                Regístrate
                            </button>
                        </>
                    ) : (
                        <>
                                ¿Ya tienes cuenta?{" "}
                                <button onClick={() => { screenIn() }} type="button" className={styles.toggleButton}>
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