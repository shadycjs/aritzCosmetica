import { useState, useEffect } from "react";
import CenteredContainer from "../../components/CenteredContainer/CenteredContainer";
import styles from "./Success.module.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineUpload } from "react-icons/ai";
import { useCart } from "../../context/CartContext";
import Swal from 'sweetalert2';
import { NavLink } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';

function Success() {

    const [searchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');

    return (
        <CenteredContainer>
            <div className={`d-flex flex-column ${styles.container}`}>
                <h1>Muchas gracias por tu compra!</h1>
                <p>El pedido se encuentra reservado, recorda cargar el comprobante de pago dentro de las proximas 48hs,
                    sino el mismo se cancelara</p>

                <div className={styles.containerComprobante}>
                    <b>Carga tu comprobante en la sección pedidos en el detalle de tu pedido :D</b>

                    <label className={`d-flex gap-3 ${styles.shippingLabels}`}>
                        <NavLink
                            to={`/user/my-requests/my-order/${orderId}`}
                            className={styles.btnShippingNext}
                        >
                            Ir a mi pedido
                        </NavLink>
                    </label>
                </div>
            </div>
        </CenteredContainer>
    );
}

export default Success;