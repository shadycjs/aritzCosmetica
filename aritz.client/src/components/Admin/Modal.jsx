import styles from '../Admin/Modal.module.css'
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { IoMdAddCircle } from "react-icons/io";
function Modal({ productName, productCategory, productImg, productPrice, productQuantity, productDescription, productStatus, productId, refresh, productsGallery }) {

    const [prdData, setPrdData] = useState({
        PRD_IMAGE: null,
        PRD_ID: productId ?? '',
        PRD_NAME: productName ?? '',
        PRD_PRICE: productPrice ?? '',
        PRD_QUANTITY: productQuantity ?? '',
        PRD_DESCRIPTION: productDescription ?? '',
        PRD_IS_ACTIVE: productStatus != null ? String(productStatus) : ''
    });
    const [imagesToUpdate, setImagesToUpdate] = useState({}); 
    const [addImg, setAddImg] = useState([]);

    // Sincroniza el estado cuando cambien las props
    useEffect(() => {
        setPrdData({
            PRD_IMAGE: null,
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
        const { name, value, type, files } = e.target; // <--- Agregamos type y files

        setPrdData(prev => ({
            ...prev,
            // Si es archivo usamos files[0], si no, usamos value
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleAddImg = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            // Usamos el spread operator (...prev) para NO borrar los anteriores
            setAddImg(prev => [...prev, ...newFiles]);

            // Truco: Limpiamos el input para permitir subir el mismo archivo 2 veces si se desea
            e.target.value = '';
        }
    }

    const handleGalleryChange = (e, imgId) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            // Guardamos en el objeto: Clave = ID, Valor = Archivo
            setImagesToUpdate(prev => ({
                ...prev,
                [imgId]: file
            }));
        }
    }

    const handleUpdPrd = async ()  => {
        try {
            const formData = new FormData();

            formData.append('PRD_ID', prdData.PRD_ID);
            formData.append('PRD_NAME', prdData.PRD_NAME);
            formData.append('PRD_PRICE', prdData.PRD_PRICE);
            formData.append('PRD_QUANTITY', prdData.PRD_QUANTITY);
            formData.append('PRD_DESCRIPTION', prdData.PRD_DESCRIPTION);
            formData.append('PRD_IS_ACTIVE', prdData.PRD_IS_ACTIVE);

            // Cambia la imagen PRINCIPAL por OTRA
            if (prdData.PRD_IMAGE) {
                formData.append('MainImageFile', prdData.PRD_IMAGE);
            }
            
            // Agrega una Imagen NUEVA
            if (addImg) {
                addImg.forEach((file) => {
                    formData.append('NewGalleryImages', file);
                });
            }

            Object.keys(imagesToUpdate).forEach((keyId) => {
                const file = imagesToUpdate[keyId];

                // Enviamos el ID y el Archivo por separado pero en orden
                formData.append('UpdatedGalleryIds', keyId);
                formData.append('UpdatedGalleryFiles', file);
            });

            console.log("Datos enviados al backend: ", formData);
            const response = await axiosInstance.post('Products/updPrd', formData);
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
                                <div className={styles.imageSecondaryProductDivSub}>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputGroupFile02"
                                        name="PRD_IMAGE"
                                        accept="image/*"
                                        onChange={handlePrdData}
                                    />
                                    <label
                                        className="input-group-text"
                                        htmlFor="inputGroupFile02">
                                        Actualizar imagen
                                    </label>
                                </div>
                                <label>
                                    Imagen Principal:
                                    <img src={`https://localhost:7273/images/${productImg}`} />
                                </label>

                            </div>
                        </div>
                        {productsGallery.length > 0
                            ?
                            productsGallery.map((img, index) => (
                                <div
                                    key={index}
                                    className={styles.imageSecondaryProductDiv}
                                >
                                    <label>
                                        Imagen {index + 2}
                                        <img src={`https://localhost:7273/images/${img.IMG_URL}`} />
                                    </label>
                                    <div className={styles.imageSecondaryProductDivSub}>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="inputGallery"
                                            onChange={(e) => { handleGalleryChange(e, img.IMG_ID) }}
                                            accept="image/*"
                                        />
                                        <label
                                            className="input-group-text"
                                            htmlFor="inputGroupFile03">
                                            Actualizar imagen {index + 2}
                                        </label>
                                    </div>
                                        {imagesToUpdate.length > 0 && (
                                            <div className="mt-2 small text-muted">
                                                Archivo: {imagesToUpdate.map(f => f.name)}
                                            </div>
                                        )}
                                </div>

                            ))
                            :
                            ''
                        }
                        <div className={styles.agregarImgNuevaDiv}>
                            <IoMdAddCircle
                                size={50}
                            />
                            Agregar una imagen nueva
                            <input
                                type="file"
                                accept="image/*"
                                className={styles.agregarImgNuevaInput}
                                onChange={handleAddImg}
                                multiple
                            />
                        </div>
                        {addImg.length > 0 && (
                            <div className="mt-2 small text-muted">
                                Archivo: {addImg.map(f => f.name).join(', ')}
                            </div>
                        )}

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