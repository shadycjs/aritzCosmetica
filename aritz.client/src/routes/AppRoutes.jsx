import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Products/Products';
import Contact from '../pages/Contact';
import Auth from '../components/Auth/Auth';
import Cart from '../components/Cart/Cart';
import ShippingInfo from '../components/CheckoutSteps/ShippingInfo';
import ShippingMehod from '../components/CheckoutSteps/PaymentMethod';
import PaymentInfo from '../components/CheckoutSteps/PaymentInfo';
import Success from '../pages/Checkout/Success';
import ProductDetail from '../pages/Products/ProductDetail';
import MyRequests from '../pages/Requests/MyRequests';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/shipping-info" element={<ShippingInfo />} />
            <Route path="/checkout/payment-method" element={<ShippingMehod />} />
            <Route path="/checkout/pay" element={<PaymentInfo />} />
            <Route path="/checkout/pay-success" element={<Success />} />
            <Route path="/product/product-detail/:id" element={<ProductDetail />} />
            <Route path="/user/my-requests" element={<MyRequests /> } />
        </Routes>
    );
};

export default AppRoutes;