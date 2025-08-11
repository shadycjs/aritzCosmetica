import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';
import { FaHome, FaBoxOpen, FaEnvelope, FaShoppingCart } from 'react-icons/fa';
import Auth from '../Auth/Auth';
import { useSession } from '../../context/SessionContext';


const Header = () => {

    const { isLoggedIn } = useSession();

    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container d-flex">
                {/* Logo */}
                <NavLink
                    className={`navbar-brand ${styles.aritzLogo}`}
                    to="/"
                >
                    Aritz
                </NavLink>

                {/* Botón para hamburguesa en dispositivos móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Enlaces de navegación */}
                <div className="collapse navbar-collapse d-flex">
                    <ul className="navbar-nav">
                        <li className={`${styles.navItem} d-flex`}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                }
                                to="/">
                                <FaHome />
                                Inicio
                            </NavLink>
                        </li>
                        <li className={styles.navItem}>
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                } to="/product">
                                <FaBoxOpen />
                                Productos
                            </NavLink>
                            <div className={styles.dropdown}>
                                <ul>
                                    <li>
                                        <h5><b> Cremas faciales </b></h5>
                                        <NavLink to="/products/cremas-faciales/product-1" className={styles.dropdownItem}>
                                            Producto 1
                                        </NavLink>
                                        <NavLink to="/products/cremas-faciales/product-1" className={styles.dropdownItem}>
                                            Producto 1
                                        </NavLink>
                                    </li>
                                    <li>
                                        <h5><b> Pastas dentales </b></h5>
                                        <NavLink to="/products/pastas-dentales/product-2" className={styles.dropdownItem}>
                                            Producto 2
                                        </NavLink>
                                    </li>
                                    <li>
                                        <h5><b> Sprays </b></h5>
                                        <NavLink to="/products/product-3" className={styles.dropdownItem}>
                                            Producto 3
                                        </NavLink>
                                    </li>
                                </ul>
                                                                <ul>
                                    <li>
                                        <h5><b> Desodorantes </b></h5>
                                        <NavLink to="/products/cremas-faciales/product-1" className={styles.dropdownItem}>
                                            Producto 1
                                        </NavLink>
                                        <NavLink to="/products/cremas-faciales/product-1" className={styles.dropdownItem}>
                                            Producto 1
                                        </NavLink>
                                    </li>
                                    <li>
                                        <h5><b> Shampoos </b></h5>
                                        <NavLink to="/products/pastas-dentales/product-2" className={styles.dropdownItem}>
                                            Producto 2
                                        </NavLink>
                                    </li>
                                    <li>
                                        <h5><b> Jabones </b></h5>
                                        <NavLink to="/products/product-3" className={styles.dropdownItem}>
                                            Producto 3
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                }
                                to="/contact">
                                <FaEnvelope />
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Carrito de compras y LogIn */}
                <div className={styles.logAndCart}>
                    <div className={styles.logueo}>
                        {
                            isLoggedIn ? "Ramiro" :
                            <NavLink
                                to="/login"
                            >
                                LogIn / Sing In
                            </NavLink>  }
                    </div>
                    <NavLink
                        className={styles.carritoContainer}
                        to="/cart"
                        style={ {color: "#fff"} }
                    >
                        <FaShoppingCart className={styles.carrito} />
                        <p className={styles.carritoContador}>0</p>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Header;