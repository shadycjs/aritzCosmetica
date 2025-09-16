import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './MyRequests.module.css';
function MyRequests() {



    return (
        <CenteredContainer>
            <h1 className={styles.requestsTitle}>Mis pedidos</h1>
            <div className={styles.requestsContainer}>
                
            </div>
        </CenteredContainer>
  );
}

export default MyRequests;