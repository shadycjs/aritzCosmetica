import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import styles from "./AdminPostalCode.module.css";
import { FaEdit } from "react-icons/fa";

function AdminPostalCodes() {

    const [postalCodes, setPostalCodes] = useState([]);

    useEffect(() => {
        fetchPostalCodes();
    }, []);

    const fetchPostalCodes = async () => {
        try {

            const response = await axiosInstance.get('Shipping/getPostalCodes');
            setPostalCodes(response.data);

        } catch (e) {
            console.log("Error al obtener los codigos postales", e);
        }
    }

    return (
        <div className={styles.containerPostalCode} >
            <h1>Codigo Postal</h1>
            <div className={styles.subContaienrPostalCode}>
                <div>
                    <table className={styles.postalCodeTable}>
                        <thead>
                            <tr>
                                <th>Provincia</th>
                                <th>Min ZIP Code</th>
                                <th>Max ZIP Code</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postalCodes.map((postalCode) => (
                                <tr>
                                    <td>{postalCode.Name}</td>
                                    <td>{postalCode.MinZipCode}</td>
                                    <td>{postalCode.MaxZipCode}</td>
                                    <td>${postalCode.Price}</td>
                                    <td>
                                        <FaEdit
                                            size={20}
                                            style={{ cursor: "pointer" }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => setSelectedProduct(producto)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminPostalCodes;