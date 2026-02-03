import React from "react";
import PropTypes from "prop-types"; // Para la validación de props
import styles from "./ImageWithText.module.css";

function ImageWithText({ imageSrc, altText, description, textAlign = "center", title, clase }) {
    return (
        <div className={styles[clase]}>
            <div className={styles.imageContainer}>
                <img src={imageSrc} alt={altText} className={styles.image} />
            </div>
            <div className={styles.descriptionContainer}>
                <h2 className={styles.text}>{title}</h2>
                <p style={{ textAlign: textAlign }}>
                    {description}
                </p>
            </div>
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