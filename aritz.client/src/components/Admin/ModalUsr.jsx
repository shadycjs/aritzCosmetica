import { useState, useEffect } from "react";
import styles from '../Admin/Modal.module.css'
import axiosInstance from "../../api/axiosConfig";
import { NavLink } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

function ModalUsr({ user }) {

    const [dataShow, setDataShow] = useState('Info');
    const [orderUser, setOrderUser] = useState([]);

    const getOrderUser = async () => {
        try {
            const response = await axiosInstance.get(`Order/${user.USR_ID}`);
            setOrderUser(response.data);
        } catch (e) {
            console.error("Error al mostrar las ordenes de compra:", e);
        }
    }

    useEffect(() => {
        getOrderUser();
    }, [user.USR_ID]);

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
                            <li className={`nav-item ${styles.pedidos}`}>
                                <p
                                    aria-current="page"
                                    href="#"
                                    className={dataShow === 'Info' ? styles.negrita : ''}
                                    onClick={() => { setDataShow('Info') }}
                                >
                                    Info
                                    
                                </p>
                            </li>
                            <li className={`nav-item ${styles.pedidos}`}>
                                <p
                                    onClick={() => { setDataShow('pedidos') }}
                                    href="#"
                                    className={dataShow === 'pedidos' ? styles.negrita : ''}
                                >
                                    Pedidos
                                </p>
                            </li>
                        </ul>
                        {dataShow == 'Info'
                            ?
                            <>
                                <div className="input-group">
                                    <span className="input-group-text">Nombre</span>
                                    <input type="text" aria-label="First name" className="form-control" value={user.USR_NAME} readOnly />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Apellido</span>
                                    <input type="text" aria-label="First name" className="form-control" value={user.USR_SURNAME} readOnly />
                                </div>
                                <div className="input-group flex-nowrap">
                                    <span className="input-group-text" id="addon-wrapping">@</span>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping" value={user.USR_EMAIL} readOnly />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">+54</span>
                                    <input type="text" aria-label="Celular" className="form-control" value={user.USR_PHONE_NUMBER} readOnly />
                                </div>
                                <div className="input-group mb-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Admin</label>
                                    <select
                                        className="form-select"
                                        id="inputGroupSelect01"
                                        value={user.USR_IS_ADMIN}
                                    >
                                        <option value="1">Si</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">DNI</span>
                                    <input type="text" aria-label="Documento" className="form-control" value={user.USR_DOCUMENT_NUMBER} readOnly />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Provincia</span>
                                    <input type="text" aria-label="Provincia" className="form-control" value={user.USR_PROVINCE} readOnly />
                                </div>
                                <div className="input-group">
                                    <span className="input-group-text">Ciudad</span>
                                    <input type="text" aria-label="Ciudad" className="form-control" value={user.USR_CITY} readOnly />
                                </div>
                            </>
                            :

                            orderUser.length <= 0
                                ?
                                <div className="d-flex flex-column align-items-center gap-3">
                                    El cliente no tiene pedidos...
                                    <FaRegSadTear size={150} />
                                </div>
                                :
                            orderUser.map((ord) => (
                                <div className="d-flex flex-column gap-2">
                                    <p className="text-start d-flex justify-content-between">Nro Orden: <b>#{ord.ORD_ID}</b></p>
                                    <div className="d-flex flex-column">
                                        <p className="text-start">Estado del pedido:</p>
                                        <div className="input-group flex-nowrap">
                                            <select
                                                className="form-select"
                                                aria-label="Default select example"
                                                name="ORD_STATUS"
                                                defaultValue={ord.ORD_STATUS}
                                            >
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="En curso">En curso</option>
                                                <option value="Finalizado">Finalizado</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <b>Comprobante de pago:</b>
                                        {ord.ReceiptPath
                                            ?
                                            <a
                                                href={`${axiosInstance.defaults.baseURL}Order/${ord.ORD_ID}/download-receipt`}
                                                rel="noopener noreferrer"
                                            >
                                            Descargar comprobante
                                            </a>
                                        :
                                            'Sin subir'
                                        }

                                    </div>
                                <hr></hr>
                                </div>
                            ))
                        }
                        
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