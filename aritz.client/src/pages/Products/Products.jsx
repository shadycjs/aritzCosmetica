import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
import product1 from '../../assets/images/product1.png'
import product2 from '../../assets/images/product2.png'
import product3 from '../../assets/images/product3.jpg'
import { FaFilter } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
function Products() {

    const { addToCart, sumCartCounter } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para controlar el spinner o carga
    const [error, setError] = useState(null); // Estado para gestionar errores

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('products'); // Realiza una solicitud GET a /api/products
                setProducts(response.data); // Actualiza el estado con los datos obtenidos
                setLoading(false); // Indica que ya terminó la carga
            } catch (err) {
                console.error("Error al obtener los productos", err); // Muestra el error en consola
                setError(err.message); // Guarda el mensaje de error en el estado
                setLoading(false); // Indica que ya terminó la carga, incluso si hubo error
            }
        };

        fetchProducts();
    }, []); // El uso de un array vacío asegura que solo se ejecute al montar el componente
    if (loading) return <div>Cargando productos...</div>;
    if (error) return <div>Error: {error}</div>;



    console.log(products);
    const next = (id) => {
        navigate(`/product/product-detail/${id}`);
    }

    return (
        <>
            <CenteredContainer>
                {   products.length == 0 ? <h2>No se encontraron productos</h2> :
                    <div>
                        <h1 className={styles.title}>Nuestros productos</h1>
                        <p style={{ color: "#777" }}>Elegi los mejores productos al mejor precio.</p>
                    </div>
                }
            </CenteredContainer>

            <div className={styles.productsPage}>
                {/* Aside para los filtros */}
                <aside className={styles.filters}>
                    <h3 className={styles.filtersTitle}>FILTROS <FaFilter /></h3>
                    <ul className={styles.filterList}>
                        <li className={styles.filterItem}>
                            <label>
                                <input type="checkbox" />
                                Cuidado Facial
                            </label>
                        </li>
                        <li className={styles.filterItem}>
                            <label>
                                <input type="checkbox" />
                                Cuidado Corporal
                            </label>
                        </li>
                        <li className={styles.filterItem}>
                            <label>
                                <input type="checkbox" />
                                Productos Organicos
                            </label>
                        </li>
                    </ul>
                </aside>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="row">
                                {products.map((producto) => (
                                    <div
                                        key={producto.prD_ID}
                                        className={`col-md-4 ${styles.columna}`}
                                        >
                                    <div className={`card ${styles.carta}`}>
                                            <img src={`src/assets/images/${producto.prD_IMAGE}`} className="card-img-top" alt="Producto 1" />
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                                <h5 onClick={() => next(producto.prD_ID)} className={`card-title ${styles.productTitle}`}>{producto.prD_NAME}</h5>
                                            <p className="card-text">${producto.prD_PRICE}</p>
                                        </div>
                                            <button onClick={() => { sumCartCounter(); addToCart(producto) }} className={styles.cartaAddCart}>Agregar al carrito</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                        </div>
                </div>
            </div>
        </>
  );
}

export default Products;