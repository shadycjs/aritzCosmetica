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
            <h2>Método de Pago</h2>
            <button onClick={() => handleSelectMethod("Credit Card")}>Tarjeta de Crédito</button>
            <button onClick={() => handleSelectMethod("PayPal")}>PayPal</button>
        </div>
    );
}

export default PaymentInfo;