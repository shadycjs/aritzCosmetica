import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import { useParams } from 'react-router-dom';
import styles from "./MyRequestDetail.module.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

function MyRequestDetail() {

    const { id } = useParams();
    const [requestDet, setRequestDet] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRequestDetail = async () => {
            try {
                const response = await axiosInstance.get(`Order/requestDetail/${id}`);
                setRequestDet(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error al obtener las ordenes", error);
                setError(error.message);
            }
        };
        fetchRequestDetail();
    }, [id]);

    return (
        <CenteredContainer>
            <h2 className={styles.requestsTitle}>Orden #{id}</h2>
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
        </CenteredContainer>
  );
}

export default MyRequestDetail;