import React from "react";
import styles from "./Footer.module.css"
/*
  Footer.jsx
  Simple, accessible footer component used across the application.
  Keeps styling and content minimal so consumers can style via CSS.
*/

function Footer () {
  const year = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo" aria-label="Site footer">
      <div className="app-footer__inner">
        <div className="app-footer__brand">
          <span className="app-footer__logo" aria-hidden="true">©</span>
          <span className="app-footer__company">
                Aritz {year}
          </span>
        </div>

          <nav className="app-footer__nav" aria-label="Footer">
            <ul className="app-footer__list">
                <li className="app-footer__item">
                  <a className="app-footer__link" href="">
                    Tienda
                  </a>
                </li>
            </ul>
          </nav>
      </div>
    </footer>
  );
};

export default Footer;