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

    const [paymentMethod, setPaymentMethod] = useState(1);   // Ejemplo: "Tarjeta" o "PayPal"
    const [zipPrice, setZipPrice] = useState(0);

    return (
        <CheckoutContext.Provider
            value={{
                customerInfo,
                setCustomerInfo,
                paymentMethod,
                setPaymentMethod,
                zipPrice,
                setZipPrice
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export const useCheckout = () => useContext(CheckoutContext);