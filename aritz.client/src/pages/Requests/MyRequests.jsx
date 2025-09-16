import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './MyRequests.module.css';
function MyRequests() {



    return (
        <CenteredContainer>
            <h1 className={styles.requestsTitle}>Mis pedidos</h1>
            <div className={styles.requestsContainer}>
                <table className={styles.requestsTable}>
                    <thead>
                        <tr>
                            <th>Nro Orden</th>
                            <th>Fecha</th>
                            <th>Monto total</th>
                            <th>Estado</th>
                            <th>Forma de pago</th>
                            <th>Comprobante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </CenteredContainer>
  );
}

export default MyRequests;