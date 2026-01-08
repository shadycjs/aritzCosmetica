import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import { useParams } from 'react-router-dom';
import styles from "./MyRequestDetail.module.css";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import Swal from 'sweetalert2';
import { useSession } from "../../context/SessionContext";
import { BiRefresh } from "react-icons/bi";
import { AiOutlineUpload } from "react-icons/ai";
import BreadCrum from "../../components/BreadCrum/BreadCrum";
import { formatPrice } from '../../utils/utils';

function MyRequestDetail() {

    const { id } = useParams();
    const [requestDet, setRequestDet] = useState([]);
    const [error, setError] = useState(null);
    const [totalQuantity, setQuantity] = useState(0);
    const [totalAmount, setAmount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [uploading, setUploading] = useState({}); // Estado de carga por orden
    const { userId } = useSession();
    const [path, setPath] = useState(false);


    useEffect(() => {
        // Obtengo el detalle de la orden
        const fetchRequestDetail = async () => {
            try {
                const response = await axiosInstance.get(`Order/requestDetail/${id}`);
                setRequestDet(response.data);
                console.log(response.data[0].ReceiptPath);
                if (response.data[0].ReceiptPath) {
                    setPath(true);
                } else {
                    setPath(false);
                }

                // Cálculo de la cantidad total de items
                const totalQuantity = response.data.reduce((acc, item) => acc + (item.Quantity || 0), 0);
                setQuantity(totalQuantity);

                // Calculo el total a pagar
                const totalAmount = response.data.reduce((acc, item) => acc + item.TotalPrice * item.Quantity, 0);
                setAmount(totalAmount);//Aca iria el ENVIO cuando tenga hecha esa logica

            } catch (error) {
                console.error("Error al obtener las ordenes", error);
                setError(error.message);
            }
        };
        fetchRequestDetail();
    }, [id]);



    const handleFileUpload = async (id, event) => {
        const file = event.target.files[0];
        if (!file) {
            Swal.fire({
                title: 'Error al subir el comprobante de pago',
                text: 'Subí un comprobante válido',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        // Validar tipo de archivo
        const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
        const extension = `.${file.name.split('.').pop().toLowerCase()}`;
        if (!allowedExtensions.includes(extension)) {
            Swal.fire({
                title: 'Error al subir el comprobante',
                text: 'Solo se permiten archivos PDF, JPG o PNG',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading((prev) => ({ ...prev, [id]: true }));
            const response = await axiosInstance.post(`Order/${id}/upload-receipt`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            // Actualizar la orden en el estado
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.ORD_ID === id ? { ...order, ReceiptPath: response.data.ReceiptPath } : order
                )
            );

            setPath(true);

            Swal.fire({
                title: '¡Éxito!',
                text: 'Comprobante subido exitosamente',
                icon: 'success',
                confirmButtonText: 'Aceptar',
            });
        } catch (error) {
            console.error('Error al subir el comprobante:', error);
            Swal.fire({
                title: 'Error al subir el comprobante',
                text: 'Ocurrió un error al subir el archivo',
                icon: 'error',
                confirmButtonText: 'Aceptar',
            });
        } finally {
            setUploading((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <div>
            <BreadCrum id={id}/>
        
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
                                    <img src={`https://localhost:7273/images/${request.ProductImage}`} />
                                </div>
                                <div className={styles.itemsDetailSub}>
                                    <h4>{request.ProductName}</h4>
                                    <p>Cantidad: {request.Quantity}</p>
                                    <p>c/u ${request.TotalPrice}</p>
                                </div>
                                <div className={styles.TotalPrice}>
                                    <b>Subtotal:</b>
                                    <p>${formatPrice(request.TotalPrice*request.Quantity)}</p>
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
                        <p>Costo de envio: </p>
                        <hr></hr>
                        <p>Total a pagar: ${formatPrice(totalAmount)}</p>
                    </div>
                    <div className={styles.Comprobante}>
                        <b>{path ? 'Este es el comprobante que subiste' : 'Subi tu comprobante aca'}</b>
                        {path ? (
                            <div className={styles.fileRefreshDownload}>
                                <a
                                    href={`${axiosInstance.defaults.baseURL}Order/${id}/download-receipt`}
                                    rel="noopener noreferrer"
                                    className={styles.downloadLink}
                                >
                                    Descargar comprobante
                                </a>
                                <label className={styles.fileInput}>
                                    <BiRefresh className={styles.refreshIcon} size={30} />
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload(id, e)}
                                        disabled={uploading[id]}
                                    />
                                </label>
                            </div>
                        ) : (
                                <label className={styles.fileInput}>
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileUpload(id, e)}
                                        disabled={uploading[id]}
                                    />
                                    {uploading[id] ? (
                                        <span className={styles.loading}>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </span>
                                    ) : (
                                        <span className="d-flex justify-content-center align-items-center gap-2">
                                            <AiOutlineUpload /> Cargar comprobante
                                        </span>
                                    )}
                                </label>
                        )}
                    </div>
                    <div className={styles.factura}>

                    </div>
                </div>
            </div>
        </div>
  );
}

export default MyRequestDetail;