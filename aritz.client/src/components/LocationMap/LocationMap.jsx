import React from 'react';
import styles from './LocationMap.module.css';

function LocationMap() {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.descriptionContainer}>
                <h2>Visítanos</h2>
                <p>Estamos en el corazón de la ciudad</p>
                <b>Los Manantiales 63, X5194 Villa Gral. Belgrano, Córdoba</b>
            </div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d503.0933637716363!2d-64.56094420648976!3d-31.977299257226726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d2b1627d701d03%3A0x3461ee06f75364b7!2sPaseo%20de%20los%20artesanos!5e0!3m2!1ses!2sar!4v1770000471960!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }} 
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicacion Aritz"
            ></iframe>
        </div>
    );
}

export default LocationMap;