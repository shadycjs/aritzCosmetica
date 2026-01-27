import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import imagen1 from '../../assets/images/imagenCarrousel1.jpg';
import imagen2 from '../../assets/images/imagenCarrousel2.jpg';
import imagen3 from '../../assets/images/imagenCarrousel3.jpg';
import styles from './Carroussel.module.css'; // Importa el CSS personalizado

function Carroussel() {

    const [img, setPrdImg] = useState([]);

    useEffect(() => {
        fetchImgPrd();
    }, []);

    const fetchImgPrd = async () => {
        try {
            const response = await axiosInstance.get('products');
            setPrdImg(response.data);

        } catch (e) {
            console.log("Error al traer la imagen: ", e)
        }
    }

    return (
        <div className={styles.carrouselContainer}>
            <div id="carouselExampleFade" className={`carousel slide carousel-fade ${styles.carrouselContainerSub}`}>
                <div className="carousel-inner">
                    {img.map((im, index) => (
                        <div
                            className={`imgCarContainer carousel-item ${index === 0 ? "active" : ""}`}
                            key={im.PRD_ID}
                        >
                            <img
                                src={`https://localhost:7273/images/${im.PRD_IMAGE}`}
                                className={`${styles.carrouselImage}`}
                                alt="..."
                            />
                        </div>
                    ))}
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleFade"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Carroussel;