import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './Products.module.css'
function Products() {
    return (
        <CenteredContainer>
            <h1 className={styles.title}>Nuestros productos</h1>
            <p>lorem ipsum</p>
        </CenteredContainer>
  );
}

export default Products;