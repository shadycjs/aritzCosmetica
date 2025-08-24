import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
import product1 from '../../assets/images/product1.png'
import product2 from '../../assets/images/product2.png'
import product3 from '../../assets/images/product3.jpg'
import { FaFilter } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Products() {

    const { addToCart, sumCartCounter } = useCart();
    const navigate = useNavigate();

    const next = (id) => {
        navigate(`/product/product-detail/${id}`);
    }

    // Productos de prueba
    const Productos = [
        {
            id: 1, // ID único del producto, útil para identificarlos
            name: "Pasta dental", // Nombre del producto
            price: 19.99, // Precio del producto
            image: product1 // URL de la imagen
        },
        {
            id: 2,
            name: "Crema facial",
            price: 29.99,
            image: product2
        },
        {
            id: 3,
            name: "Unguento calendula",
            price: 65.99,
            image: product3
        }
    ]

    return (
        <>
            <CenteredContainer>
                <h1 className={styles.title}>Nuestros productos</h1>
                <p style={{ color: "#777" }}>Elegi los mejores productos al mejor precio.</p>
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
                                {/* Producto 1 */}
                                {Productos.map((producto) => (
                                    <div
                                        key={producto.id}
                                        className={`col-md-4 ${styles.columna}`}
                                        >
                                    <div className={`card ${styles.carta}`}>
                                        <img src={producto.image} className="card-img-top" alt="Producto 1" />
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                                <h5 onClick={() => next(producto.id)} className={`card-title ${styles.productTitle}`}>{producto.name}</h5>
                                            <p className="card-text">${producto.price}</p>
                                            </div>
                                            <button onClick={() => { sumCartCounter(); addToCart(producto) }} className={styles.cartaAddCart}>Agregar al carrito</button>
                                    </div>
                                </div>
                                )) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}

export default Products;