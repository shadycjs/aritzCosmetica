import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import Provinces from "../../data/Provinces.json"

function ShippingInfo() {
    const navigate = useNavigate();
    const { customerInfo, setCustomerInfo } = useCheckout();

    const [formData, setFormData] = useState(customerInfo);
    const [selectedProvincia, setSelectedProvincia] = useState(""); // Estado para la provincia seleccionada

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

    const back = () => {
        navigate("/cart");
    };

    const handleChangeProvince = (event) => {
        setSelectedProvincia(event.target.value);
    };

    return (
        <CenteredContainer>
            <form className="d-flex flex-column">
                <h6>CONTACTO</h6>
                <label className={styles.shippingLabels}>
                    <input
                        className={styles.shippingInputs}
                        type="email"
                        name="email"
                        placeholder="Email"/>
                </label>
            </form>
            <hr className={styles.shippingSeparate} ></hr>
            <form className={`d-flex ${styles.formShippingInfo}`} onSubmit={handleSubmit}>
                <h6>INFORMACION DE ENVIO</h6>
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <input
                        className={styles.shippingInputs}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nombre"
                    />
                    <input
                        className={styles.shippingInputs}
                        type="text"
                        name="surname"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Apellido"
                    />
                </label>
                <label className={styles.shippingLabels} htmlFor="provincias">
                    <select
                        className={styles.shippingInputs}
                        name="provincias"
                        id="provincias"
                        value={selectedProvincia}
                        onChange={handleChangeProvince}
                    >
                        <option value="">Selecciona una provincia</option>
                        {Provinces.map((provincia) => (
                            <option key={provincia} value={provincia}>
                                {provincia}
                            </option>
                        ))}
                    </select>
                </label>
                <label className={styles.shippingLabels}>
                    <input
                        className={styles.shippingInputs}
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="Ciudad"
                    />
                </label>
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <input
                        className={styles.shippingInputs}
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        placeholder="Direccion"
                    />
                    <input
                        className={styles.shippingInputs}
                        type="number"
                        name="postal"
                        value={formData.postalCode}
                        onChange={handleChange}
                        required
                        placeholder="Codigo Postal"
                    />
                </label>
                <label className={styles.shippingLabels}>
                    <input
                        className={styles.shippingInputs}
                        type="telphone"
                        name="cellphone"
                        value={formData.cellphone}
                        onChange={handleChange}
                        required
                        placeholder="Telefono"
                    />
                </label>
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                    <button className={styles.btnShippingNext} type="submit">Siguiente</button>
                </label>
            </form>
        </CenteredContainer>
    );
}

export default ShippingInfo;