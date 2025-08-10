import { useSession } from "../../context/SessionContext";
import styles from "./Auth.module.css";

function Auth() {

    const { isLoggedIn } = useSession();

    return (
        <div className={styles.container}>
            {/* Título dinámico */}
            <h2 className={styles.title}>{isLoggedIn ? "Inicia Sesión" : "Regístrate"}</h2>

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
                {!isLoggedIn && (
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                    </div>
                )}

                {/* Botón enviar */}
                <button type="submit" className={styles.submitButton}>
                    {isLoggedIn ? "Iniciar Sesión" : "Crear Cuenta"}
                </button>
            </form>

            {/* Toggle entre Login y Registro */}
            <p className={styles.toggleText}>
                {isLoggedIn ? (
                    <>
                        ¿No tienes cuenta?{" "}
                        <button type="button" className={styles.toggleButton}>
                            Regístrate
                        </button>
                    </>
                ) : (
                    <>
                        ¿Ya tienes cuenta?{" "}
                        <button type="button" className={styles.toggleButton}>
                            Inicia Sesión
                        </button>
                    </>
                )}
            </p>
        </div>
    );
}

export default Auth;