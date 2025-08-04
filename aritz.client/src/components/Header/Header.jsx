import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';
import { FaHome, FaBoxOpen, FaEnvelope } from 'react-icons/fa';

const Header = () => {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container d-flex">
                {/* Logo */}
                <NavLink
                    className={`navbar-brand ${styles.aritzLogo}`}
                    to="/"
                    style={{ fontFamily: '"Dancing Script", cursive'}}
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
                        <li className="nav-item d-flex">
                            <NavLink
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                }
                                to="/">
                                <FaHome />
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                } to="/product">
                                <FaBoxOpen />
                                Products
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                className={({ isActive }) =>
                                    isActive ? `${styles.item} nav-link active` : `${styles.item} nav-link`
                                }
                                to="/contact">
                                <FaEnvelope />
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;