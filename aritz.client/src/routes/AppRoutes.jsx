import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Products/Products';
import Contact from '../pages/Contact';
import Auth from '../components/Auth/Auth';
import Cart from '../components/Cart/Cart';
import ShippingInfo from '../components/CheckoutSteps/ShippingInfo';
import ShippingMehod from '../components/CheckoutSteps/ShippingMethod';
import PaymentInfo from '../components/CheckoutSteps/PaymentInfo';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/shipping-info" element={<ShippingInfo />} />
            <Route path="/checkout/shipping-method" element={<ShippingMehod />} />
            <Route path="/checkout/payment-method" element={<PaymentInfo />} />
        </Routes>
    );
};

export default AppRoutes;