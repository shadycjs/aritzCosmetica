import React from "react";
import PropTypes from "prop-types"; // Para la validación de props
import styles from "./ImageWithText.module.css";

function ImageWithText({ imageSrc, altText, description, textAlign = "center" }) {
    return (
        <div className={`${styles.container}`}>
            {/* Imagen */}
            <img src={imageSrc} alt={altText} className={styles.image} />
            {/* Descripción */}
            <p className={styles.text} style={{ textAlign: textAlign }}>
                {description}
            </p>
        </div>
    );
}

// Validación de props con PropTypes
ImageWithText.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    textAlign: PropTypes.oneOf(["left", "center", "right"]),
};

export default ImageWithText;