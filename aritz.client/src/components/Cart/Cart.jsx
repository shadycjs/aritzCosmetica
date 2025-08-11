import React from "react";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";
import CenteredContainer from "../CenteredContainer/CenteredContainer";

function Carrito() {
    const { cartItems, removeFromCart, clearCart, getTotalPrice } = useCart();

    return (
        <CenteredContainer>
            <div className={styles.container}>
                <h1 className={styles.title}>Tu Carrito</h1>

                {cartItems.length === 0 ? (
                    <p className={styles.emptyMessage}>No tienes productos en tu carrito.</p>
                ) : (
                    <>
                        <ul className={styles.cartList}>
                            {cartItems.map((item) => (
                                <li key={item.id} className={styles.cartItem}>
                                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                                    <div className={styles.itemDetails}>
                                        <h4>{item.name}</h4>
                                        <p>Precio: ${item.price}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className={styles.removeButton}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.total}>
                            <h3>Total: ${getTotalPrice()}</h3>
                        </div>

                        <div className={styles.actions}>
                            <button className={styles.clearButton} onClick={clearCart}>
                                Vaciar Carrito
                            </button>
                            <button className={styles.checkoutButton}>Proceder al Pago</button>
                        </div>
                    </>
                )}
            </div>
        </CenteredContainer>
    );
}

export default Carrito;