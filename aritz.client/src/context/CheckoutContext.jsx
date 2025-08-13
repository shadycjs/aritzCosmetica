import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        cellphone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");   // Ejemplo: "Tarjeta" o "PayPal"

    return (
        <CheckoutContext.Provider
            value={{
                customerInfo,
                setCustomerInfo,
                paymentMethod,
                setPaymentMethod,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);