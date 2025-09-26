import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import { useParams } from 'react-router-dom';
import styles from "./MyRequestDetail.module.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

function MyRequestDetail() {

    const { id } = useParams();
    const [requestDet, setRequestDet] = useState([]);
    const [error, setError] = useState(null);
    const [totalQuantity, setQuantity] = useState(0);
    const [totalAmount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchRequestDetail = async () => {
            try {
                const response = await axiosInstance.get(`Order/requestDetail/${id}`);
                setRequestDet(response.data);
                console.log(response.data);

                // Cálculo de la cantidad total de items
                const totalQuantity = response.data.reduce((acc, item) => acc + (item.Quantity || 0), 0);
                setQuantity(totalQuantity);
                // Calculo el total a pagar
                const totalAmount = response.data.reduce((acc, item) => acc + item.TotalPrice * item.Quantity, 0);
                console.log(totalAmount);
                setAmount(totalAmount);
                setTotal(totalAmount);//Aca iria el ENVIO cuando tenga hecha esa logica

            } catch (error) {
                console.error("Error al obtener las ordenes", error);
                setError(error.message);
            }
        };
        fetchRequestDetail();
    }, [id]);

    return (
        <div className={styles.centeredContainer}>
            <div className={styles.items}>
                <div className={styles.shiippingData}>
                    Llega entre el * y el *
                </div>
                {requestDet.map((request) => (
                    <div
                        className={styles.itemsContainer}
                        key={request.IdOrderDetail}>
                        <b>Compra #{request.IdOrderDetail}</b>
                        <hr></hr>
                        <div className={styles.itemsDetail}>
                            <div className={styles.imageContainer}>
                                <img src={`/../src/assets/images/${request.ProductImage}`} />
                            </div>
                            <div className={styles.itemsDetailSub}>
                                <h4>{request.ProductName}</h4>
                                <p>Cantidad: {request.Quantity}</p>
                                <p>c/u ${request.TotalPrice}</p>
                            </div>
                            <div className={styles.TotalPrice}>
                                <b>Subtotal:</b>
                                <p>${request.TotalPrice*request.Quantity}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.aside}>
                <div className={styles.resumen}>
                    <b>Resumen de compra</b>
                    <p>Nro orden: <b>#{id}</b></p>
                    <p>Cantidad de items: {totalQuantity}</p>
                    <hr></hr>
                    <p>Total a pagar: {total}</p>
                </div>
                <div className={styles.Comprobante}>

                </div>
                <div className={styles.factura}>

                </div>
            </div>
        </div>
  );
}

export default MyRequestDetail;