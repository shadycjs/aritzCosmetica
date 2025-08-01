import React from 'react';
import { NavLink } from "react-router-dom";
import styles from './Header.module.css';

const Header = () => {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container d-flex justify-content-evenly">
                {/* Logo */}
                <NavLink className="navbar-brand" to="/">
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
                <div className="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/">
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }                                to="/product">
                                Product
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                                }
                                to="/contact">
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