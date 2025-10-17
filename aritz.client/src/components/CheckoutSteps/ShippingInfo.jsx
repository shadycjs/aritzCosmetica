import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../../context/CheckoutContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import Provinces from "../../data/Provinces.json";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useSession } from "../../context/SessionContext";
import axiosInstance from "../../api/axiosConfig";

function ShippingInfo() {
    const navigate = useNavigate();

    const [selectedProvincia, setSelectedProvincia] = useState(""); // Estado para la provincia seleccionada
    const [account, setAccount] = useState([]);
    const [error, setError] = useState(null);
    const { userId } = useSession();
    const [formShipData, setShipData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        provincia: '',
        ciudad: '',
        codpostal: '',
        calle: '',
        altura: '',
        piso: '',
        casadepto: ''
    });

    useEffect(() => {
        setShipData({
            nombre: account.USR_NAME || '',
            apellido: account.USR_SURNAME || '',
            email: account.USR_EMAIL || '',
            telefono: account.USR_PHONE_NUMBER || '',
            provincia: account.USR_PROVINCE || '',
            ciudad: account.USR_CITY || '',
            codpostal: account.USR_POSTAL_CODE || '',
            calle: account.USR_STREET || '',
            altura: account.USR_STREET_NUMBER || '',
            piso: account.USR_FLOOR || '',
            casadepto: account.USR_APARTMENT || ''
        })
    }, [account]);

    //navigate("/checkout/payment-method"); // Ir al siguiente paso

    const back = () => {
        navigate("/cart");
    };

    const handleChangeProvince = (event) => {
        setSelectedProvincia(event.target.value);
    };

    const fetchAccount = async () => {
        try {
            const response = await axiosInstance.get(`Account/${userId}`);
            setAccount(response.data); // Actualiza el estado con los datos obtenidos
            console.log('Cuenta:', response.data);
        } catch (err) {
            console.error("Error al obtener la cuenta", err);
            setError(err.message);
        }
    };

    const handleShipData = async (e) => {
        e.preventDefault();
        try {
            const { name, value } = e.target;
            setShipData(prev => ({
                ...prev,
                [name]: value
            }));
        } catch (error) {
            alert(error.response?.data?.Message || 'Error en formulario');
        }
    }

    useEffect(() => {
        fetchAccount();
    }, [userId]); 

    return (
        <CenteredContainer>
            <TimeLapseCheckout />
            <div className={styles.container}>
                <div className="d-flex flex-column gap-2">
                    <h6>CONTACTO</h6>
                    <label className={styles.shippingLabels}>
                        <input
                            className={styles.shippingInputs}
                            type="email"
                            name="email"
                            value={formShipData.email}
                            placeholder="Email"
                        />
                    </label>
                    <label className={styles.shippingLabels}>
                        <input
                            className={styles.shippingInputs}
                            type="telphone"
                            name="cellphone"
                            value={formShipData.telefono}
                            onChange={handleShipData}
                            placeholder="Telefono"
                        />
                    </label>
                </div>
                <hr className={styles.shippingSeparate} ></hr>
                <div className={`d-flex ${styles.formShippingInfo}`}>
                    <h6>INFORMACION DE ENVIO</h6>
                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <input
                            className={styles.shippingInputs}
                            type="text"
                            name="name"
                            value={formShipData.nombre}
                            onChange={handleShipData}
                            
                            placeholder="Nombre"
                        />
                        <input
                            className={styles.shippingInputs}
                            type="text"
                            name="surname"
                            value={formShipData.apellido}
                            onChange={handleShipData}
                            
                            placeholder="Apellido"
                        />
                    </label>
                    <label className={styles.shippingLabels} htmlFor="provincias">
                        <select
                            className={styles.shippingInputs}
                            name="provincias"
                            id="provincias"
                            value={formShipData.provincia || Provinces[0]}
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
                            value={formShipData.ciudad}
                            onChange={handleShipData}
                            
                            placeholder="Ciudad"
                        />
                    </label>
                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <input
                            className={styles.shippingInputs}
                            type="text"
                            name="calle"
                            value={formShipData.calle}
                            onChange={handleShipData}
                            
                            placeholder="Calle"
                        />
                        <input
                            className={styles.shippingInputs}
                            type="number"
                            name="postal"
                            value={formShipData.codpostal}
                            onChange={handleShipData}
                            
                            placeholder="Codigo Postal"
                        />
                    </label>
                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <input
                            className={styles.shippingInputs}
                            type="number"
                            name="postal"
                            value={formShipData.altura}
                            onChange={handleShipData}

                            placeholder="Altura"
                        />
                        <input
                            className={styles.shippingInputs}
                            type="number"
                            name="postal"
                            value={formShipData.piso}
                            onChange={handleShipData}

                            placeholder="Piso"
                        />
                        <input
                            className={styles.shippingInputs}
                            type="number"
                            name="postal"
                            value={formShipData.casadepto}
                            onChange={handleShipData}

                            placeholder="Casa"
                        />
                    </label>

                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <button type="button" onClick={back} className={styles.btnShippingBack}>Volver</button>
                        <button className={styles.btnShippingNext} type="submit">Siguiente</button>
                    </label>
                </div>
            </div>
        </CenteredContainer>
    );
}

export default ShippingInfo;