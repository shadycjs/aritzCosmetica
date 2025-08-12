import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";

function ShippingInfo() {
    const navigate = useNavigate();
    const { customerInfo, setCustomerInfo } = useCheckout();

    const [formData, setFormData] = useState(customerInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    console.log(customerInfo);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCustomerInfo(formData); // Actualiza el contexto con los datos ingresados
        navigate("/checkout/shipping-method"); // Ir al siguiente paso
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Información de Envío</h2>
            <label>
                Nombre:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Dirección:
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Ciudad:
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
            </label>
            <button type="submit">Siguiente</button>
        </form>
    );
}

export default ShippingInfo;