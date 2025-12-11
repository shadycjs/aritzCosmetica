import { useState, useEffect } from "react";
import styles from '../Admin/Modal.module.css'
import axiosInstance from "../../api/axiosConfig";
import Swal from 'sweetalert2'; // Importar SweetAlert2
function DelProduct({ prdCatName, prdDelName, prdDelId, prdDelImg }) {

    const handleDeletePrd = async (prdDelId) => {
        try {
            const response = await axiosInstance.delete(`Products/delPrd/${prdDelId}`);

            Swal.fire({
                title: 'Se elimino el producto',
                icon: 'success',
                confirmButtonText: 'Ok'
            })

        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
            alert("No se pudo eliminar el producto del carrito.");
        }
    }

    return (
        <div
            className="modal fade"
            id="staticBackdropDeleteModal"
            data-bs-backdrop="static"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Deseas borrar {prdCatName} {prdDelName} ?</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={styles.imageDeleteContainer}>
                            <img src={`https://localhost:7273/images/${prdDelImg}`} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => { handleDeletePrd(prdDelId) }}
                        >
                            Borrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DelProduct;