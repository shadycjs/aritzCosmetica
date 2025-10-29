import styles from '../Admin/AdminManage.module.css'
import { FaEdit } from "react-icons/fa";
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from "react";
import Modal from './Modal';
function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('products'); // Realiza una solicitud GET a /api/products
                setProducts(response.data); // Actualiza el estado con los datos obtenidos
                console.log('Productos obtenidos:', response.data);
                setLoading(false); // Indica que ya terminó la carga
            } catch (err) {
                console.error("Error al obtener los productos", err); // Muestra el error en consola
                setError(err.message); // Guarda el mensaje de error en el estado
                setLoading(false); // Indica que ya terminó la carga, incluso si hubo error
            }
        };

        fetchProducts();
    }, []); 
    return (
        <>
            <table className={styles.productsUserTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((producto) => (
                        <tr key={producto.PRD_ID}>
                            <td>
                                {producto.PRD_ID}
                            </td>
                            <td>
                                {producto.Category.CAT_NAME}
                            </td>
                            <td>
                                {producto.PRD_NAME}
                            </td>
                            <td>
                                {producto.PRD_PRICE}
                            </td>
                            <td>
                                {producto.PRD_QUANTITY}
                            </td>
                            <td>
                                {producto.PRD_IS_ACTIVE ? 'Si' : 'No'}
                            </td>
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
            <Modal
                productCategory={selectedProduct?.Category.CAT_NAME}
                productName={selectedProduct?.PRD_NAME}
                productImg={selectedProduct?.PRD_IMAGE}
                productPrice={selectedProduct?.PRD_PRICE}
            />
        </>
    )
}

export default AdminProducts;