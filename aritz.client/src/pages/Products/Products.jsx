import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
import product1 from '../../assets/images/product1.png'
import product2 from '../../assets/images/product2.png'
import product3 from '../../assets/images/product3.jpg'
import { FaFilter } from "react-icons/fa";
function Products() {
    return (
        <>
            <CenteredContainer>
                <h1 className={styles.title}>Nuestros productos</h1>
                <p>lorem ipsum</p>
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
                                <div className={`col-md-4 ${styles.columna}`}>
                                    <div className={`card ${styles.carta}`}>
                                        <img src={product1} className="card-img-top" alt="Producto 1" />
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                            <h5 className="card-title">Pasta dental</h5>
                                            <p className="card-text">$19.99</p>
                                        </div>
                                        <button className="btn btn-primary">Agregar al carrito</button>
                                    </div>
                                </div>
                                {/* Repetir productos */}
                                <div className={`col-md-4 ${styles.columna}`}>
                                    <div className={`card ${styles.carta}`}>
                                        <img src={product2} className="card-img-top" alt="Producto 1" />
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                            <h5 className="card-title">Crema facial</h5>
                                            <p className="card-text">$44.99</p>
                                        </div>
                                        <button className="btn btn-primary">Agregar al carrito</button>
                                    </div>
                                </div>
                                <div className={`col-md-4 ${styles.columna}`}>
                                    <div className={`card ${styles.carta}`}>
                                        <img src={product3} className="card-img-top" alt="Producto 1" />
                                        <div className={`card-body ${styles.cuerpoCarta}`}>
                                            <h5 className="card-title">Unguento calendula</h5>
                                            <p className="card-text">$99.99</p>
                                        </div>
                                        <button className="btn btn-primary">Agregar al carrito</button>
                                    </div>
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