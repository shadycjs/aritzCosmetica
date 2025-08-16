import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useNavigate } from "react-router-dom";
//import { BrickBuilder } from "@mercadopago/sdk-react";
import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago('TEST-aa2427a9-e156-4f55-b4c0-d9c5e9b5774c');

function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const { cartItems, removeFromCart, clearCart, getTotalPrice, resCartCounter } = useCart();
    const navigate = useNavigate();

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
                        {cartItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.quantity*item.price}</td>
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
                <h1>Total: <b className={styles.total}>${getTotalPrice(3000)}</b></h1>
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
                        <button className={styles.btnShippingNext} onClick={next} type="submit">Confirmar pedido</button>
                : ''}
                </label>

            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;