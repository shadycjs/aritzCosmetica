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
import { useLocation } from 'react-router'
import { formatPrice } from '../../utils/utils';
function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const navigate = useNavigate();

    const { fetchCountCart, fetchSumTotalCart, totalSumCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const location = useLocation();

    const { userId, setPageCheckout } = useSession();
    setPageCheckout(location);

    if (totalSumCart < 20000) {
        navigate('/cart');
    }

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
        console.log(paymentMethod);
        try {
            const orderResponse = await axiosInstance.post("Order/confirmOrder", {
                userId,
                paymentMethod,
                totalSumCart
            });

            const orderId = orderResponse.data.OrderId;
            if (!orderId) {
                throw new Error('No se recibió el OrderId del backend.');
            }

            const detailResponse = await axiosInstance.post('order/confirmOrderDetail', {
                userId,
                orderId,
            });


            Swal.fire({
                title: '¡Exito!',
                text: detailResponse.data.Message || 'Pedido confirmado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });

            fetchCountCart();
            fetchSumTotalCart();
            navigate(`/checkout/pay-success?orderId=${orderId}`);
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
            <div className="container" style={{padding: "50px"}}>
                <div className="row">
                    <div className={`col d-flex flex-column gap-4 ${styles.resumeContainer}`}>
                        {cart.map((car) => (
                            <div
                                className={styles.cartItem}
                            >
                                <div className={styles.imgItem}>
                                    <img src={`https://localhost:7273/images/${car.PRD_IMAGE}`} />
                                </div>
                                <div className={styles.detailItem}>
                                    <div className={styles.nameQuantity}>
                                        <b>{car.PRD_NAME}</b>
                                        <p>Cantidad: {car.CAI_QUANTITY}</p>
                                    </div>
                                    
                                    <div className={styles.precio}>
                                        <b>Subtotal</b>
                                        <p>$ {formatPrice(car.PRD_PRICE * car.CAI_QUANTITY)}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
                        <div className={styles.envio}>
                            <p className="d-flex justify-content-between">Envio: <b>${formatPrice(3000)}</b></p>
                        </div>
                        <div className={styles.total}>
                            <p className="d-flex justify-content-between">Total: <b>${formatPrice(totalSumCart)}</b></p>
                        </div>
                    </div>
                    
                    <div className="col">
                        {paymentMethod === 2 ?
                            <div className={styles.bankContainer}>
                                <h2>Datos bancarios</h2>
                                <div className={styles.bankContainerSub}>
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
                    </div>
                    
                </div>

                <div className="row">
                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <button onClick={back} className={styles.btnShippingBack}>Volver</button>
                        {paymentMethod === 2 ?
                            <button className={styles.btnShippingNext} onClick={() => { handleOrderConfirm(totalSumCart) }} type="submit">Confirmar pedido</button>
                            : ''}
                    </label>
                </div>


            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;