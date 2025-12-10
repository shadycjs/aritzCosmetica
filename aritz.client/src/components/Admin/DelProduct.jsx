import styles from '../Admin/Modal.module.css'
function DelProduct({prdCatName, prdDelName, prdDelId, prdDelImg}) {
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
                        <button type="button" className="btn btn-danger">Borrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DelProduct;