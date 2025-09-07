import { useParams } from 'react-router-dom';
import CenteredContainer from '../../components/CenteredContainer/CenteredContainer';
import styles from "./ProductDetail.module.css";
import img1 from "../../assets/images/product1.png"
import sinImg from "../../assets/images/sinImagen.png"
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`products/${id}`); 
                setProduct(response.data); // 
                console.log(product)
                setLoading(false); // 
            } catch (err) {
                console.error("Error al obtener los productos", err); 
                setError(err.message);
                setLoading(false); 
            }
        };

        fetchProduct();
    }, []); // El uso de un array vacío asegura que solo se ejecute al montar el componente

    if (loading) return <div>Cargando producto...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img className={styles.imgMain} src={`/src/assets/images/${product.PRD_IMAGE}`} />
                    <div className={styles.subImgContainer}>
                        <img src={sinImg} />
                        <img src={sinImg} />
                        <img src={sinImg} />
                        <img src={sinImg} />
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <h3 className={styles.titleInfo}>{product.PRD_NAME}</h3>
                    <b className={styles.priceInfo}>${product.PRD_PRICE}</b>
                    <p className={styles.descInfo}>{product.PRD_DESCRIPTION}</p>
                    <button className={styles.addCartInfo}>Agregar al carrito</button>
                </div>
                
            </div>
        </div>
  );
}

export default ProductDetail;