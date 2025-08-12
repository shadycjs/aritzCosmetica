import React from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";

function ShippingMethod() {
    const navigate = useNavigate();
    const { setShippingMethod } = useCheckout();

    const handleSelectMethod = (method) => {
        setShippingMethod(method); // Actualiza el método de envío en el contexto
        navigate("/checkout/payment-method"); // Ir al paso final
    };

    return (
        <div>
            <h2>Elige un Método de Envío</h2>
            <button onClick={() => handleSelectMethod("Standard")}>Estándar</button>
            <button onClick={() => handleSelectMethod("Express")}>Exprés</button>
        </div>
    );
}

export default ShippingMethod;