import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
import { FaFilter } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useSession } from "../../context/SessionContext";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import BreadCrum from "../../components/BreadCrum/BreadCrum";
import { CiSearch, CiFilter } from "react-icons/ci";
import Filters from "./Filters/Filters";
function Products() {
    
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const { userId } = useSession();
    const [loading, setLoading] = useState(true); // Estado para controlar el spinner o carga
    const [error, setError] = useState(null); // Estado para gestionar errores
    const { fetchCountCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('products'); // Realiza una solicitud GET a /api/products
                setProducts(response.data); // Actualiza el estado con los datos obtenidos
                console.log('Productos obtenidos:', response.data);
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

    const handleAddToCart = async (productId, quantity = 1) => {
        try {
            if (userId == null) {
                Swal.fire({
                    title: 'Debe iniciar sesion para agregar productos al carrito',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
                return;
            }

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

    const next = (id) => {
        navigate(`/product/product-detail/${id}`);
    }

    return (
        <>
            <CenteredContainer>
                <BreadCrum />
                {   products.length == 0 ? <h2>No se encontraron productos</h2> :
                    <div>
                        <h1 className={styles.title}>Nuestros productos</h1>
                        <p style={{ color: "#777" }}>Elegi los mejores productos al mejor precio.</p>
                    </div>
                }

            </CenteredContainer>
        <div className="d-flex justify-content-center">
            <div className={styles.productsPage}>
                {/* Aside para los filtros */}
                <aside className={styles.filters}>
                    <h3 className={styles.filtersTitle}>FILTROS <FaFilter /></h3>
                    <ul className={styles.filterList}>
                        <Filters />
                    </ul>
                </aside>

                <div className="container d-flex flex-column gap-4 justify-content-start">
                    <div className="input-group flex-nowrap" >
                        <span className="input-group-text" id="addon-wrapping"><CiSearch /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Buscar..."
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                        />
                    </div>
                    <div className="row d-flex justify-content-start">
                        <div className="">
                            <div className="row">
                                {products.map((producto) => (
                                <div
                                    key={producto.PRD_ID}
                                    className={`col-12 col-sm-6 col-lg-3 ${styles.columna}`}
                                >
                                    <div className={`card ${styles.carta}`}>
                                        <div className={styles.cartaImgContainer}>
                                            <img src={`https://localhost:7273/images/${producto.PRD_IMAGE}`} className="card-img-top"/>
                                        </div>
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                            <h5 onClick={() => next(producto.PRD_ID)} className={`card-title ${styles.productTitle}`}>{producto.Category.CAT_NAME} {producto.PRD_NAME}</h5>
                                            <p className="card-text">${producto.PRD_PRICE}</p>
                                        </div>
                                            <button onClick={() => { handleAddToCart(producto.PRD_ID) }} className={styles.cartaAddCart}>Agregar al carrito</button>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
  );
}

export default Products;