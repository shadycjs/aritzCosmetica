import styles from '../Admin/AdminManage.module.css'
import { FaEdit } from "react-icons/fa";
import axiosInstance from '../../api/axiosConfig';
import { useState, useEffect } from "react";
import Modal from './Modal';
import { CiSearch, CiFilter } from "react-icons/ci";
function AdminProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        fetchCategories();
        fetchProducts();
    }, []); 

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('products'); // Realiza una solicitud GET a /api/products
            setProducts(response.data); // Actualiza el estado con los datos obtenidos
            setLoading(false); // Indica que ya terminó la carga
        } catch (err) {
            console.error("Error al obtener los productos", err); // Muestra el error en consola
            setError(err.message); // Guarda el mensaje de error en el estado
            setLoading(false); // Indica que ya terminó la carga, incluso si hubo error
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('Products/by-category'); // Realiza una solicitud GET a /api/products
            setCategories(response.data); // Actualiza el estado con los datos obtenidos
            console.log('Categorias obtenidas:', response.data);
        } catch (err) {
            console.error("Error al obtener los productos", err); // Muestra el error en consola
            setError(err.message); // Guarda el mensaje de error en el estado
        }
    }

    // Función para agrupar en bloques de 3
    const groupCategories = (items, size = 3) => {
        const groups = [];
        for (let i = 0; i < items.length; i += size) {
            groups.push(items.slice(i, i + size));
        }
        return groups;
    };

    const categoryGroups = groupCategories(categories);

    return (
        <>
            <div className={styles.filtrosContainer}>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping"><CiSearch /></span>
                    <input type="search" className="form-control" placeholder="Buscar..." aria-label="Username" aria-describedby="addon-wrapping" />
                </div>
                <div className={styles.filter}>
                    <CiFilter
                        size={40}
                        style={{ cursor: "pointer" }}
                        data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                    />
                    <h5>Filtros:</h5>
                </div>
            </div>
            <div className={`collapse ${styles.filterGroup}`} id="collapseExample">
                {categoryGroups.map((group, groupIndex) => (
                    <ul key={`group-${groupIndex}`}>
                        {group.map((category) => (
                            <li
                                className={styles.filterItem}
                                key={category.CAT_ID}
                            >
                                <label>
                                    <input type="checkbox" />
                                    {category.CAT_NAME}
                                </label>
                            </li>
                        ))}
                    </ul>
                ))}

            </div>
            <table className={styles.productsUserTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Categoria</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Activo</th>
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
                                $ {producto.PRD_PRICE}
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
                productQuantity={selectedProduct?.PRD_QUANTITY}
                productDescription={selectedProduct?.PRD_DESCRIPTION}
                productStatus={selectedProduct?.PRD_IS_ACTIVE}
                productId={selectedProduct?.PRD_ID}
            />
        </>
    )
}

export default AdminProducts;