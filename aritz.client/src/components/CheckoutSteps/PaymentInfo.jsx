import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useSession } from "../../context/SessionContext";
import Swal from 'sweetalert2';
import { useLocation } from 'react-router'
import { formatPrice } from '../../utils/utils';

initMercadoPago('TEST-aa2427a9-e156-4f55-b4c0-d9c5e9b5774c', { locale: 'es-AR' });
function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const navigate = useNavigate();

    const { fetchCountCart, fetchSumTotalCart, totalSumCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);
    const [preferenceId, setPreferenceId] = useState(null);  // Estado para almacenar el preferenceId MercadoPago

    const location = useLocation();

    const { userId, setPageCheckout } = useSession();
    setPageCheckout(location);

    if (totalSumCart < 20000 && !loading) {
        navigate('/cart');
    }

    useEffect(() => {
        fetchCart();
    }, [userId]);

    useEffect(() => {
        if (paymentMethod === 1 && totalSumCart > 0 && cart.length > 0) {
            createMercadoPagoPreference();
        }
    }, [paymentMethod, totalSumCart, cart]);

    // FUNCIÓN PARA PEDIR EL preferenceId AL BACKEND (MercadoPagoController.cs)
    const createMercadoPagoPreference = async () => {
        try {
            // Preparamos los datos para tu backend
            // Adaptar esto a como espera los datos tu OrderDto en C#
            const orderData = {
                userId: userId,
                totalSumCart: totalSumCart,
                // Mapeamos el carrito al formato que espera tu DTO Items
                items: cart.map(item => ({
                    ProductName: item.PRD_NAME,
                    Quantity: item.CAI_QUANTITY,
                    UnitPrice: item.PRD_PRICE
                }))
            };

            const response = await axiosInstance.post("MercadoPago/create_preference", orderData);

            if (response.data.preferenceId) {
                setPreferenceId(response.data.preferenceId);
                console.log("Preferencia creada ID:", response.data.preferenceId);
            }
        } catch (error) {
            console.error("Error al crear preferencia MP:", error);
        }
    }

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

    const next = () => {
        navigate('/checkout/pay-success');
    }

    return (
        <CenteredContainer>
            <TimeLapseCheckout />
            <div className="container" style={{padding: "50px"}}>
                <div className="row">
                    <div className={`col d-flex flex-column gap-4 ${styles.resumeContainer}`}>
                        <h3>Tu pedido</h3>
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
                                <div>
                                    <h1 className={styles.logoAritz}>Aritz</h1>
                                </div>

                                <h2>Datos transferencia</h2>
                                <div className={styles.bankContainerSub}>
                                    <b>CBU: 0000003100048344628186</b>
                                    <b>Alias: ramiro.unrein </b>
                                </div>
                            </div> :


                            <div className={styles.mpContainer}>
                                <h3>Pagar con MercadoPago</h3>
                                {preferenceId ? (
                                    // AQUÍ RENDERIZAMOS EL BRICK OFICIAL DE REACT
                                    <Wallet
                                        initialization={{ preferenceId: preferenceId }}
                                        customization={{ texts: { valueProp: 'smart_option' } }}
                                    />
                                ) : (
                                    <p>Cargando botón de pago...</p>
                                )}
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