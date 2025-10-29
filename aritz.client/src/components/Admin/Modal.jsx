import styles from '../Admin/Modal.module.css'
function Modal({ productName, productCategory, productImg, productPrice }) {
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
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">$</span>
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Price"
                                    aria-label="Username"
                                    aria-describedby="addon-wrapping"
                                    value={productPrice}
                                    />
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