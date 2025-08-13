import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useNavigate } from "react-router-dom";

function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const navigate2 = useNavigate();

    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        //alert("Pedido completado con éxito!"); // Aquí irías a la lógica de confirmación
    };

    const back = () => {
        navigate2("/checkout/shipping-info");
    };

    return (
        <CenteredContainer>
            <TimeLapseCheckout />
            <div className={styles.container}>
                <h2>Metodo de Pago</h2>
                <button onClick={() => handleSelectMethod("Credit Card")}>Tarjeta de Crédito</button>
                <button onClick={() => handleSelectMethod("PayPal")}>MercadoPago</button>
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                    <button className={styles.btnShippingNext} type="submit">Siguiente</button>
                </label>
            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;