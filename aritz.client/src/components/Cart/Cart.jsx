import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";
import CenteredContainer from "../CenteredContainer/CenteredContainer";
import { useNavigate } from "react-router-dom";
import TimeLapseCheckout from "../CheckoutSteps/Timelapse/TimelapseCheckout";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

function Carrito() {
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        navigate("/checkout/shipping-info"); // Redirige al paso 1 del checkout
    };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get(`Cart/user/2`);
                setCart(response.data); // 
                console.log(response.data);
                setLoading(false); // 
            } catch (err) {
                console.error("Error al obtener los productos", err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchCart();
    }, []); 

    if (loading) return <div>Cargando carrito...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleRemoveFromCart = async (productId) => {
        try {
            const userId = 2; // ID del usuario autenticado
            console.log(`Eliminando producto con ID: ${productId} para el usuario: ${userId}`);

            // Realiza la solicitud DELETE al backend
            const response = await axiosInstance.delete(`Cart/user/${userId}/product/${productId}`);

            // Remueve el producto del carrito en el estado del frontend
            setCart(cart.filter((item) => item.prD_ID !== productId));

            alert("Producto eliminado del carrito.");
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
            alert("No se pudo eliminar el producto del carrito.");
        }
    };

    return (
        <CenteredContainer>
            {cart.length === 0 ? '' : <TimeLapseCheckout />}
            <div className={styles.container}>
                <h1 className={styles.title}>Tu Carrito</h1>

                {cart.length === 0 ? (
                    <p className={styles.emptyMessage}>No tienes productos en tu carrito.</p>
                ) : (
                    <>
                        <ul className={styles.cartList}>
                            {cart.map((car) => (
                                <li key={car.caI_ID} className={styles.cartItem}>
                                    <img src={`src/assets/images/${car.prD_IMAGE}`} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <h4>{car.prD_NAME}</h4>
                                        <p>Precio: ${car.caI_TOTAL_PRICE}</p>
                                        <p>Cantidad: {car.caI_QUANTITY}</p>
                                        <button
                                            onClick={() => { handleRemoveFromCart(car.prD_ID) }}
                                            className={styles.removeButton}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.total}>
                            <h3>Total: $</h3>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.clearButton}>
                                Vaciar Carrito
                            </button>
                                <button onClick={handleProceedToCheckout} className={styles.checkoutButton}>Proceder al Pago</button>
                        </div>
                    </>
                )}
            </div>
        </CenteredContainer>
    );
}

export default Carrito;