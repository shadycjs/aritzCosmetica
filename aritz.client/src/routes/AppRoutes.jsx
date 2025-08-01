import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Product from '../pages/Products';
import Contact from '../pages/Contact';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    );
};

export default AppRoutes;