import styles from '../Admin/Modal.module.css'
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import Swal from 'sweetalert2'; // Importar SweetAlert2
function Modal({ productName, productCategory, productImg, productPrice, productQuantity, productDescription, productStatus, productId, refresh }) {

    const [prdData, setPrdData] = useState({
        PRD_ID: productId ?? '',
        PRD_NAME: productName ?? '',
        PRD_PRICE: productPrice ?? '',
        PRD_QUANTITY: productQuantity ?? '',
        PRD_DESCRIPTION: productDescription ?? '',
        PRD_IS_ACTIVE: productStatus != null ? String(productStatus) : ''
    });

    // Sincroniza el estado cuando cambien las props
    useEffect(() => {
        setPrdData({
            PRD_ID: productId ?? '',
            PRD_NAME: productName ?? '',
            PRD_PRICE: productPrice ?? '',
            PRD_QUANTITY: productQuantity ?? '',
            PRD_DESCRIPTION: productDescription ?? '',
            PRD_IS_ACTIVE: productStatus != null ? String(productStatus) : ''
        });
    }, [
        productId,
        productName,
        productCategory,
        productImg,
        productPrice,
        productQuantity,
        productDescription,
        productStatus
    ]);

    const handlePrdData = (e) => {
        const { name, value } = e.target;
        setPrdData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdPrd = async ()  => {
        try {
            const dataToSend = {
                PRD_ID: Number(prdData.PRD_ID),                    // int
                PRD_NAME: prdData.PRD_NAME?.trim() || null,        // string
                PRD_PRICE: parseFloat(prdData.PRD_PRICE) || 0,     // decimal
                PRD_QUANTITY: parseInt(prdData.PRD_QUANTITY, 10) || 0, // int
                PRD_DESCRIPTION: prdData.PRD_DESCRIPTION?.trim() || null, // string
                PRD_IS_ACTIVE: prdData.PRD_IS_ACTIVE === 'true'    // bool
            };
            console.log("Datos enviados al backend: ", dataToSend);
            const response = await axiosInstance.post('Products/updPrd', dataToSend);
            refresh(prev => !prev);

            const closeBtn = document.querySelector('#staticBackdrop .btn-close');
            if (closeBtn) {
                closeBtn.click();
            }

            Swal.fire({
                title: 'Informacion actualizada correctamente!',
                icon: 'success',
                confirmButtonText: 'Continuar'
            })
        } catch (e) {
            console.log("Error al actualizar los datos: ", e);
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
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {productCategory} {productName}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center">
                        <div className={styles.imageProductDiv}>
                            <div className="input-group mb-3 d-flex gap-2">
                                <label>
                                    Imagen 1:
                                    <img src={`https://localhost:7273/images/${productImg}`} />
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputGroupFile02"
                                    name=""
                                    accept="image/*"
                                />
                                <label
                                    className="input-group-text"
                                    htmlFor="inputGroupFile02">
                                    Subir imagen
                                </label>
                            </div>
                        </div>
                        <div className={styles.imageSecondaryProductDiv}>
                            <label>
                                Imagen 2:
                                <img src="" />
                            </label>
                            <label>
                                Imagen 3:
                                <img src="" />
                            </label>
                            <label>
                                Imagen 4:
                                <img src="" />
                            </label>
                        </div>
                        <hr></hr>
                        <div className={styles.infoProductoDiv}>
                            <div className="d-flex flex-column">
                                <p className="text-start">Titulo:</p>
                                <div className="input-group flex-nowrap">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Titulo"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={prdData.PRD_NAME}
                                        name="PRD_NAME"
                                        onChange={handlePrdData}
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <p className="text-start">Precio:</p>
                                <div className="input-group flex-nowrap">
                                        <span className="input-group-text" id="addon-wrapping">$</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Price"
                                            aria-label="Username"
                                            aria-describedby="addon-wrapping"
                                            value={prdData.PRD_PRICE}
                                            name="PRD_PRICE"
                                            onChange={handlePrdData}
                                            />
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <p className="text-start">Cantidad:</p>
                                <div className="input-group flex-nowrap">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Quantity"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={prdData.PRD_QUANTITY}
                                        name="PRD_QUANTITY"
                                        onChange={handlePrdData}
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <div className="input-group">
                                    <span className="input-group-text">Descripcion:</span>
                                    <textarea
                                        className="form-control"
                                        aria-label="With textarea"
                                        value={prdData.PRD_DESCRIPTION}
                                        name="PRD_DESCRIPTION"
                                        onChange={handlePrdData}
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-column">
                                <p className="text-start">Activo:</p>
                                <div className="input-group flex-nowrap">
                                    <select
                                        className="form-select"
                                        aria-label="Default select example"
                                        value={prdData.PRD_IS_ACTIVE}
                                        name="PRD_IS_ACTIVE"
                                        onChange={handlePrdData}
                                    >
                                        <option value="">Open this select menu</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleUpdPrd}
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;