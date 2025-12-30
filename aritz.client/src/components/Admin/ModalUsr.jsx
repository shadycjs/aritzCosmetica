function ModalUsr({ user }) {
    return (
        <div
            className="modal fade"
            id="staticBackdropUsr"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">{user.USR_NAME} {user.USR_SURNAME}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex flex-column gap-3">
                        <div className="input-group">
                            <span className="input-group-text">Nombre</span>
                            <input type="text" aria-label="First name" className="form-control" />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">Apellido</span>
                            <input type="text" aria-label="First name" className="form-control" />
                        </div>
                        <div class="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">@</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" />
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">+54</span>
                            <input type="text" aria-label="Celular" className="form-control" />
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="inputGroupSelect01">Admin</label>
                            <select className="form-select" id="inputGroupSelect01">
                                <option selected>Choose...</option>
                                <option value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">DNI</span>
                            <input type="text" aria-label="Documento" className="form-control" />
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">Provincia</span>
                            <input type="text" aria-label="Provincia" className="form-control" />
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">Ciudad</span>
                            <input type="text" aria-label="Ciudad" className="form-control" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalUsr;