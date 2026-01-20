import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";

function ModalOrder({ order }) {

    const [ord, setOrd] = useState([]);

    useEffect(() => {
        if (order) {
            fetchOrder();
        }
    }, [order]);

    const fetchOrder = async () => {
        try {
            const response = await axiosInstance.get(`Order/requestDetail/${order}`);
            setOrd(response.data);
            console.log("Detalles recibidos:", response.data);
        } catch (error) {
            console.error("Error al buscar detalles:", error);
        }
    }

    return (
        <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel"></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {ord.map((or) => (
                            <div>
                                <p>{or.IdOrderDetail}</p>
                                <p>{or.ProductName}</p>
                            </div>
                        ))}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Understood</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalOrder;