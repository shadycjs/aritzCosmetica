import styles from '../Admin/Modal.module.css'
import { useState, useEffect } from "react";
function Modal({ productName, productCategory, productImg, productPrice, productQuantity, productDescription, productStatus }) {

    const [prdData, setPrdData] = useState({
        prdName: productName ?? '',
        prdPrice: productPrice ?? '',
        prdQuantity: productQuantity ?? '',
        prdDescription: productDescription ?? '',
        prdStatus: productStatus != null ? String(productStatus) : ''
    });

    // Sincroniza el estado cuando cambien las props
    useEffect(() => {
        setPrdData({
            prdName: productName ?? '',
            prdPrice: productPrice ?? '',
            prdQuantity: productQuantity ?? '',
            prdDescription: productDescription ?? '',
            prdStatus: productStatus != null ? String(productStatus) : ''
        });
    }, [
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

    console.log(prdData.prdStatus);

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
                            <img src={`../../src/assets/images/${productImg}`} />
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
                                        value={prdData.prdName}
                                        name="prdName"
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
                                            value={prdData.prdPrice}
                                            name="prdPrice"
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
                                        placeholder="Price"
                                        aria-label="Username"
                                        aria-describedby="addon-wrapping"
                                        value={prdData.prdQuantity}
                                        name="prdQuantity"
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
                                        value={prdData.prdDescription}
                                        name="prdDescription"
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
                                        value={prdData.prdStatus}
                                        name="prdStatus"
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
                        <button type="button" className="btn btn-primary">
                            Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;