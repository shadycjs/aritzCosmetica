import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
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
                    <h3 className={styles.filtersTitle}>Filtros</h3>
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
                                <div className="col-md-4">
                                    <div className="card">
                                        <img src="/assets/images/product1.jpg" className="card-img-top" alt="Producto 1" />
                                        <div className="card-body">
                                            <h5 className="card-title">Producto 1</h5>
                                            <p className="card-text">$19.99</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Repetir productos */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
  );
}

export default Products;