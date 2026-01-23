//import { useEffect, useState } from 'react';
import './App.css';
import BreadCrum from './components/BreadCrum/BreadCrum';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './routes/AppRoutes';

function App() {


    return (
        <div className="app-container">
            <Header />

            <main className="main-content">
                <AppRoutes />
            </main>

            <Footer />
        </div>
    );
    

}

export default App;