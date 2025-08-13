import React from "react";
import { useCheckout } from "../../context/CheckoutContext";

function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();

    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        alert("Pedido completado con éxito!"); // Aquí irías a la lógica de confirmación
    };

    return (
        <div>
            a
        </div>
    );
}

export default PaymentInfo;