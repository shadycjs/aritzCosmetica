import { useParams } from 'react-router-dom';
import CenteredContainer from '../../components/CenteredContainer/CenteredContainer';
import styles from "./ProductDetail.module.css";
import img1 from "../../assets/images/product1.png"
import sinImg from "../../assets/images/sinImagen.png"

function ProductDetail() {
    const { id } = useParams();

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.container}>
                <div className={styles.imgContainer}>
                    <img className={styles.imgMain} src={img1} />
                    <div className={styles.subImgContainer}>
                        <img src={sinImg} />
                        <img src={sinImg} />
                        <img src={sinImg} />
                        <img src={sinImg} />
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <h3 className={styles.titleInfo}>Pasta dental</h3>
                    <b className={styles.priceInfo}>$30</b>
                    <p className={styles.descInfo}>A highly potent, bioactive, multi-targeting age-defying serum—clinically proven to work at the cellular level to visibly reduce fine lines, brighten dark spots, firm, smooth, and hydrate—while optimizing skin’s natural collagen levels.</p>
                    <button className={styles.addCartInfo}>Agregar al carrito</button>
                </div>
                
            </div>
        </div>
  );
}

export default ProductDetail;