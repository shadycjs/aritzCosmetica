import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Products/Products';
import Contact from '../pages/Contact';
import Auth from '../components/Auth/Auth';
import Cart from '../components/Cart/Cart';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/cart" element={<Cart /> } />
        </Routes>
    );
};

export default AppRoutes;