import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useNavigate } from "react-router-dom";
import MercadoPagoIcon from "../../assets/icons/mercadopago.svg"
import CreditCardIcon from "../../assets/icons/creditcard.svg"

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
                <h2>Elija la forma de pago</h2>
                <div className={styles.containerPayments}>
                    <button className={styles.buttonsPayments} style={{ backgroundColor: "#F5F5DC", color: "#000" }} onClick={() => handleSelectMethod("Tarjeta")} onClick={() => handleSelectMethod("Credit Card")}><img src={CreditCardIcon} className={styles.imgMp} />Tarjeta de Credito</button>
                    <button className={styles.buttonsPayments} style={{ backgroundColor: "#00B1EA", color: "#fff" }} onClick={() => handleSelectMethod("MercadoPago")}><img src={MercadoPagoIcon} className={styles.imgMp} /></button>
                </div>
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                    <button className={styles.btnShippingNext} type="submit">Siguiente</button>
                </label>
            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;