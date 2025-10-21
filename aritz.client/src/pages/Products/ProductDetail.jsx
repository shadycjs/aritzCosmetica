import { useParams } from 'react-router-dom';
import CenteredContainer from '../../components/CenteredContainer/CenteredContainer';
import styles from "./ProductDetail.module.css";
import sinImg from "../../assets/images/sinImagen.png"
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { useSession } from "../../context/SessionContext";
import { useCart } from '../../context/CartContext';
import BreadCrum from '../../components/BreadCrum/BreadCrum';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { userId } = useSession();
    const { fetchCountCart } = useCart();

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
    }, [id]); // El uso de un array vacío asegura que solo se ejecute al montar el componente

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            console.log("Datos enviados al backend:", { userId, productId, quantity });
            const response = await axiosInstance.post("Cart/add-to-cart", {
                userId,
                productId,
                quantity,
            });

            console.log(response.data); // Muestra el mensaje del backend
            Swal.fire({
                title: 'Producto agregado correctamente!',
                icon: 'success',
                confirmButtonText: 'Seguir comprando'
            })
            fetchCountCart();
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            alert("No se pudo agregar el producto al carrito.");
        }
    };

    if (loading) return <div>Cargando producto...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        
        <div className={styles.centeredContainer}>
            <BreadCrum name={product.PRD_NAME} />
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
                    <h3 className={styles.titleInfo}>{product.Category.CAT_NAME} {product.PRD_NAME}</h3>
                    <b className={styles.priceInfo}>${product.PRD_PRICE}</b>
                    <p className={styles.descInfo}>{product.PRD_DESCRIPTION}</p>
                    <button
                        className={styles.addCartInfo}
                        onClick={() => { handleAddToCart(product.PRD_ID) }}
                    >
                        Agregar al carrito
                    </button>
                </div>
                
            </div>
            </div>
  );
}

export default ProductDetail;