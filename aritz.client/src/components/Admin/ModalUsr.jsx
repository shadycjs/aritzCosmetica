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

                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Info</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Pedido</a>
                            </li>
                        </ul>

                        <div className="input-group">
                            <span className="input-group-text">Nombre</span>
                            <input type="text" aria-label="First name" className="form-control" value={user.USR_NAME} readonly />
                        </div>
                        <div className="input-group">
                            <span className="input-group-text">Apellido</span>
                            <input type="text" aria-label="First name" className="form-control" value={user.USR_SURNAME} readonly />
                        </div>
                        <div class="input-group flex-nowrap">
                            <span className="input-group-text" id="addon-wrapping">@</span>
                            <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={user.USR_EMAIL} readonly />
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">+54</span>
                            <input type="text" aria-label="Celular" className="form-control" value={user.USR_PHONE_NUMBER} readonly />
                        </div>
                        <div className="input-group mb-3">
                            <label className="input-group-text" for="inputGroupSelect01">Admin</label>
                            <select
                                className="form-select"
                                id="inputGroupSelect01"
                                value={user.USR_IS_ADMIN}
                            >
                                <option  value="1">Si</option>
                                <option value="2">No</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">DNI</span>
                            <input type="text" aria-label="Documento" className="form-control" value={user.USR_DOCUMENT_NUMBER} readonly />
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">Provincia</span>
                            <input type="text" aria-label="Provincia" className="form-control" value={user.USR_PROVINCE} readonly/>
                        </div>
                        <div class="input-group">
                            <span className="input-group-text">Ciudad</span>
                            <input type="text" aria-label="Ciudad" className="form-control" value={user.USR_CITY} readonly/>
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