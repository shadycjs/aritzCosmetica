import imagen1 from '../../assets/images/imagenCarrousel1.jpg';
import imagen2 from '../../assets/images/imagenCarrousel2.jpg';
import imagen3 from '../../assets/images/imagenCarrousel3.jpg';
import styles from './Carroussel.module.css'; // Importa el CSS personalizado

function Carroussel() {
    return (
        <div className={styles.carrouselContainer}>
            <div id="carouselExampleFade" className={`carousel slide carousel-fade ${styles.carrouselContainerSub}`}>
                <div className="carousel-inner" style={{ width: "100%", height: "100%" }}>
                    <div className="carousel-item active" style={{ width: "100%", height: "100%" }}>
                        <img
                            src={imagen1}
                            className={`d-block w-100 ${styles.carrouselImage}`}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item" style={{ width: "100%", height: "100%" }}>
                        <img
                            src={imagen2}
                            className={`d-block w-100 ${styles.carrouselImage}`}
                            alt="..."
                        />
                    </div>
                    <div className="carousel-item" style={{ width: "100%", height: "100%" }}>
                        <img
                            src={imagen3}
                            className={`d-block w-100 ${styles.carrouselImage}`}
                            alt="..."
                        />
                    </div>
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