import React from "react";
import { useCheckout } from "../../context/CheckoutContext";
import { useCart } from "../../context/CartContext";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import styles from "./CheckoutSteps.module.css";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";

function PaymentInfo() {
    const { paymentMethod, setPaymentMethod } = useCheckout();
    const { cartItems, removeFromCart, clearCart, getTotalPrice, resCartCounter } = useCart();

    const handleSelectMethod = (method) => {
        setPaymentMethod(method);
        alert("Pedido completado con éxito!"); // Aquí irías a la lógica de confirmación
    };

    return (
        <CenteredContainer>
            <TimeLapseCheckout />
            <div className={`d-flex flex-column ${styles.container}`}>
                <h4>Detalle de tu compra</h4>
                <table>
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
                {paymentMethod === 'Tarjeta' ?
                <>
                    <h2>Datos de la Tarjeta de Crédito</h2>
                    <form>
                        <div className="form-group">
                            <label for="card-holder">Nombre del Titular</label>
                            <input type="text" id="card-holder" placeholder="Juan Pérez" required />
                        </div>

                        <div className="form-group">
                            <label for="card-number">Número de la Tarjeta</label>
                            <input type="text" id="card-number" placeholder="1234 5678 9876 5432" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group form-group-half">
                                <label for="expiry-date">Fecha de Vencimiento</label>
                                <input type="text" id="expiry-date" placeholder="MM/AA" required />
                            </div>
            
                            <div className="form-group form-group-half">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123" required />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">Pagar Ahora</button>
                    </form>
                </> :


                    <div>river</div>
                }
            </div>
        </CenteredContainer>
    );
}

export default PaymentInfo;