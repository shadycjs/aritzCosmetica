import { useState, useEffect } from "react";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from "../../components/CheckoutSteps/CheckoutSteps.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { useCart } from "../../context/CartContext";

function Success() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const { clearCart } = useCart();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Simular inicio del proceso de carga
        setLoading(true);
        setSuccess(false);
    };

    // useEffect para observar los cambios en el estado `loading`
    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => {
                setLoading(false);
                setSuccess(true);
            }, 2000); // Simulación de 2 segundos

            // Limpieza para cancelar el timeout si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [loading]); // El efecto se ejecutará solo cuando `loading` cambie

    const back = () => {
        navigate("/checkout/pay");
    };
    const next = () => {
        clearCart();
        navigate('/');
    }

    return (
        <CenteredContainer>
            <div className={`d-flex flex-column ${styles.container}`}>
                <h2>Compra reservada con éxito!</h2>
                {success ? '' : <p>Recorda cargar el comprobante de pago</p>}

                <div className={styles.containerComprobante}>
                    {success ? '' : <h4>El mismo lo puedes cargar acá o en la sección pedidos en el detalle de tu pedido</h4>}

                    <label className={styles.fileInput}>
                        <input type="file" onChange={handleFileUpload} />
                        {!loading && !success && <span className="d-flex justify-content-center align-items-center gap-2"><AiOutlineUpload />Cargar comprobante</span>}
                        {loading && <span className={styles.loading}>
                            <div class="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </span>}
                        {success && (
                            <span className={styles.success}>
                                ¡Comprobante cargado! ✅
                            </span>
                        )}
                    </label>
                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                        <button onClick={next} className={styles.btnShippingNext} type="submit">Ir a mi pedido</button>
                    </label>
                </div>
            </div>
        </CenteredContainer>
    );
}

export default Success;