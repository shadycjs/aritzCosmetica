import { useState, useEffect } from "react";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from './MyRequests.module.css';
import axiosInstance from "../../api/axiosConfig";
import { useSession } from "../../context/SessionContext";
function MyRequests() {

    const [orders, setOrders] = useState([]);
    const { userId } = useSession();

    useEffect(() => {
        getOrders();
    }, [userId]);

    const getOrders = async () => {
        try {
            const response = await axiosInstance.get(`Order/${userId}`);
            console.log(response.data);
            setOrders(response.data.Orders);
            console.log('Ordenes obtenidas:', response.data);
        } catch (error) {
            console.error("Error al mostrar las ordenes de compra:", error);
        }
    }

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
                        {orders.map((order) => (
                            <tr key={order.ORD_ID}>
                                <td>{order.ORD_ID}</td>
                                <td>{order.ORD_ORDER_DATE}</td>
                                <td>{order.ORD_TOTAL_AMOUNT}</td>
                                <td>{order.ORD_STATUS}</td>
                                <td>{order.PaymentMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CenteredContainer>
  );
}

export default MyRequests;