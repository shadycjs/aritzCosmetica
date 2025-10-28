import styles from '../Admin/AdminManage.module.css'
function AdminProducts() {

    return (
        <table className={styles.productsUserTable}>
            <thead>
                <tr>
                    <th>Product Id</th>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Categoria</th>
                    <th>Estado</th>
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
                </tr>
            </tbody>
        </table>
    )
}

export default AdminProducts;