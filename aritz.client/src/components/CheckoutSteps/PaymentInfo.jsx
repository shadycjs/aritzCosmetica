import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
//import { BrickBuilder } from "@mercadopago/sdk-react";
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
import { useSession } from "../../context/SessionContext";
initMercadoPago('TEST-aa2427a9-e156-4f55-b4c0-d9c5e9b5774c');
import Swal from 'sweetalert2';

function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const navigate = useNavigate();

    const { fetchCountCart, fetchSumTotalCart, totalSumCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    const { userId } = useSession();
    console.log(userId);

    useEffect(() => {
        fetchCart();
    }, [userId]);

    const fetchCart = async () => {
        try {
            const response = await axiosInstance.get(`Cart/user/${userId}`);
            setCart(response.data); // 
            console.log(response.data);
            setLoading(false); // 
            // Actualiza la cantidad del carrito dinámicamente desde el backend
            fetchCountCart();
            fetchSumTotalCart();
        } catch (err) {
            console.error("Error al obtener los productos", err);
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando carrito...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleOrderConfirm = async (totalSumCart) => {
        try {
            const response = await axiosInstance.post("Order/confirmOrder", {
                userId,
                totalSumCart
            });
            Swal.fire({
                title: '¡Exito!',
                text: response.data.Message || 'Pedido confirmado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
        } catch (error) {
            console.error("Error al confirmar el pedido:", error);
            alert("No se pudo confirmar el pedido.");
        }
    }


    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        alert("Pedido completado con éxito!"); // Aquí irías a la lógica de confirmación
    };

    const back = () => {
        navigate("/checkout/payment-method");
    };

    const initialization = {
        amount: 100,
        preferenceId: "<PREFERENCE_ID>",
    };
    const customization = {
        paymentMethods: {
            ticket: "all",
            creditCard: "all",
            prepaidCard: "all",
            debitCard: "all",
            mercadoPago: "all",
            wallet_purchase: "all",
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // callback called when clicking the submit data button
        return new Promise((resolve, reject) => {
            fetch("/process_payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    // receive payment result
                    resolve();
                })
                .catch((error) => {
                    // handle error response when trying to create payment
                    reject();
                });
        });
    };
    const onError = async (error) => {
        // callback called for all Brick error cases
        console.log(error);
    };
    const onReady = async () => {
        /*
          Callback called when Brick is ready.
          Here you can hide loadings from your site, for example.
        */
    };

    const next = () => {
        navigate('/checkout/pay-success');
    }

    return (
        <CenteredContainer>
            <TimeLapseCheckout />
            <div className={`d-flex flex-column ${styles.container}`}>
                <h4>Detalle de tu compra</h4>
                <table className={styles.tableDetails}>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio p/u</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                        <tr key={item.CAI_ID}>
                            <td>{item.PRD_NAME}</td>
                            <td>${item.CAI_TOTAL_PRICE}</td>
                            <td>{item.CAI_QUANTITY}</td>
                            <td>${item.CAI_QUANTITY*item.CAI_TOTAL_PRICE}</td>
                        </tr>
                        ))}
                        <tr>
                            <td>Envio</td>
                            <td>$3000</td>
                            <td></td>
                            <td>$3000</td>
                        </tr>
                    </tbody>
                </table>
                <h1>Total: <b className={styles.total}>${totalSumCart+3000}</b></h1>
                {paymentMethod === 'Tarjeta' ?
                    <div>
                        <h2>Cuenta a transferir</h2>
                        <div className={styles.bankContainer}>
                            <b>CBU: 0000003100048344628186</b>
                            <b>Alias: ramiro.unrein </b>
                        </div>
                    </div> :


                    <div className={styles.mpContainer}>
                        <Payment
                            initialization={initialization}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                        />
                    </div>
                }
                <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                    <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                    {paymentMethod === 'Tarjeta' ?
                        <button className={styles.btnShippingNext} onClick={() => { handleOrderConfirm(totalSumCart) }} type="submit">Confirmar pedido</button>
                : ''}
                </label>

            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;