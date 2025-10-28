import CenteredContainer from "../CenteredContainer/CenteredContainer";
import { CiUser } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import styles from '../Admin/AdminManage.module.css'
import AdminProducts from "./AdminProducts";


function AdminManage() {

    return (
        <CenteredContainer>
            <h1>Administrar Productos</h1>
            <div className={styles.iconsDiv}>
                <div className={styles.iconsDivUserPoducts}>
                    <CiUser size={70} />
                    <b>Usuarios</b>
                </div>
                <div className={styles.iconsDivUserPoducts}>
                    <AiOutlineProduct size={70} />
                    <b>Productos</b>
                </div>
            </div>

            <div className={styles.productsUsersAdminContainer}>
                <AdminProducts />
            </div>
        </CenteredContainer>
    )
}

export default AdminManage;