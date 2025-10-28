import CenteredContainer from "../CenteredContainer/CenteredContainer";
import { CiUser } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import styles from '../Admin/AdminManage.module.css'
import AdminProducts from "./AdminProducts";
import { useState } from "react";
import AdminUsers from "./AdminUsers";


function AdminManage() {

    const [AdmUsrPrd, setAdmUsrPrd] = useState('products');

    return (
        <CenteredContainer>
            <h1>Administrar Productos</h1>
            <div className={styles.iconsDiv}>
                <div
                    onClick={() => {setAdmUsrPrd('users')}}
                    className={`${styles.iconsDivUserPoducts} ${AdmUsrPrd === 'users' ? styles.selected : ''}`}
                >
                    <CiUser size={70} />
                    <b>Usuarios</b>
                </div>
                <div
                    onClick={() => { setAdmUsrPrd('products') }}
                    className={`${styles.iconsDivUserPoducts} ${AdmUsrPrd === 'products' ? styles.selected : ''}`}
                >
                    <AiOutlineProduct size={70} />
                    <b>Productos</b>
                </div>
            </div>

            <div className={styles.productsUsersAdminContainer}>
                {AdmUsrPrd == 'products'
                    ? 
                <AdminProducts />
                    :
                <AdminUsers />
                }
            </div>
        </CenteredContainer>
    )
}

export default AdminManage;