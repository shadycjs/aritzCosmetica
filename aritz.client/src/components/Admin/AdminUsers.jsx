import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import styles from '../Admin/AdminManage.module.css'
import { FaEdit } from "react-icons/fa";
import ModalUsr from './ModalUsr';
function AdminUsers() {

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("Account/users");
            setUsers(response.data);
        } catch (err) {
            console.error("Error al obtener los productos", err);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <>
            <table className={styles.productsUserTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Administrador</th>
                        <th>Documento</th>
                        <th>Provincia</th>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((usr) => (
                        <tr key={usr.USR_ID}>
                            <td>
                                {usr.USR_ID}
                            </td>
                            <td>{usr.USR_NAME}</td>
                            <td>{usr.USR_SURNAME}</td>
                            <td>{usr.USR_EMAIL}</td>
                            <td>{usr.USR_PHONE_NUMBER}</td>
                            <td>{usr.USR_IS_ADMIN}</td>
                            <td>{usr.USR_DOCUMENT_NUMBER}</td>
                            <td>{usr.USR_PROVINCE}</td>
                            <td>{usr.USR_CITY}</td>

                            <td>
                                <FaEdit
                                    size={20}
                                    style={{ cursor: "pointer" }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropUsr"
                                    onClick={() => setSelectedUser(usr)}
                                />
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <ModalUsr
                user={selectedUser}
            />
        </>
    )
}

export default AdminUsers;