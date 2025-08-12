import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

// Proveedor del carrito
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]); // Estado inicial del carrito, vacío.
    const [cartCounter, setCartCounter] = useState(0);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            // Si el producto ya está en el carrito, actualizamos la cantidad
            setCartItems(
                cartItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } // Aumenta la cantidad
                        : item
                )
            );
        } else {
            // Si es un nuevo producto, lo agregamos
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter((item) => item.id !== productId));
    };

    // Función para vaciar el carrito por completo
    const clearCart = () => {
        setCartItems([]);
        setCartCounter(0);
    };

    // Total del carrito
    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
    };

    //Contador del carrito
    const sumCartCounter = () => {
        setCartCounter(cartCounter + 1);
    }

    const resCartCounter = (cantidad) => {
        setCartCounter(cartCounter - cantidad);
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice, cartCounter, sumCartCounter, resCartCounter }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado
export const useCart = () => {
    return useContext(CartContext);
};