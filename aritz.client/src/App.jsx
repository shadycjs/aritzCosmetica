//import { useEffect, useState } from 'react';
import './App.css';
import BreadCrum from './components/BreadCrum/BreadCrum';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';

function App() {


    return (
        <>
            <Header />
            <AppRoutes />
        </>
    );
    

}

export default App;