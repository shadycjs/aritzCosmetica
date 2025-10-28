import styles from '../Admin/AdminManage.module.css'
import { FaEdit } from "react-icons/fa";
function AdminUsers() {

    return (
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
                    <th>Codigo postal</th>
                    <th>Calle</th>
                    <th>Altura</th>
                    <th>Casa/Depto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        1
                    </td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                        <FaEdit
                            size={20}
                            style={{ cursor: "pointer" }}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default AdminUsers;