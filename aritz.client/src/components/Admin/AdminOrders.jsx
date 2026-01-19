import styles from '../Admin/AdminManage.module.css'
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosConfig';
import { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/utils';
function AdminOrders() {

    const [allOrders, setAllOrders] = useState([]);
    const [orderUser, setOrderUser] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        const response = await axiosInstance.get('Order/allOrders');
        setAllOrders(response.data);
        console.log(response.data);
    }

    const handleStatusChange = async (orderId, newStatus) => {
        // Actualizamos el estado "orderUser" buscando la orden por su ID
        setOrderUser(prevOrders => prevOrders.map(order => {
            // Si es la orden que modificamos, actualizamos su estado
            if (order.ORD_ID === orderId) {
                return { ...order, ORD_STATUS: newStatus };
            }
            // Si no es, la dejamos igual
            return order;
        }));

        console.log("El order ID es: ", orderId);
        try {

            const bodyData = {
                OrderId: orderId,
                OrderStatus: newStatus
            };

            const response = await axiosInstance.put(`Order/${orderId}/updOrdStatus`, bodyData);
            Swal.fire('Exito', `Se actualizo correctamente el estado a ${bodyData.OrderStatus}`, 'success');
        } catch (e) {
            console.log("Error al querer actualizar el estado: ", e);
        }
    }

    return (
        <div className={styles.containerTableOrders}>
            <table className={styles.productsUserTable}>
                <thead>
                    <tr>
                        <th>Nro Orden</th>
                        <th>Fecha de la orden</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Monto</th>
                        <th>Comprobante</th>
                    </tr>
                </thead>
                <tbody>
                    {allOrders.map((order) => (
                        <tr key={order.ORD_ID}>
                            <td>
                                {order.ORD_ID}
                            </td>
                            <td>
                                {order.ORD_ORDER_DATE}
                            </td>
                            <td>
                                {order.ClientFullName}
                            </td>
                            <td>
                                <div className="input-group flex-nowrap">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        name="ORD_STATUS"
                                        defaultValue={order.ORD_STATUS}
                                        onChange={(e) => handleStatusChange(order.ORD_ID, e.target.value)}
                                    >
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="En curso">En curso</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                ${formatPrice(order.ORD_TOTAL_AMOUNT)}
                            </td>
                            <td>
                                {order.ReceiptPath
                                    ?
                                    <a
                                        href={`${axiosInstance.defaults.baseURL}Order/${order.ORD_ID}/download-receipt`}
                                        rel="noopener noreferrer"
                                    >
                                        Descargar comprobante
                                    </a>
                                    :
                                    'Sin subir'
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default AdminOrders;