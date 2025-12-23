import styles from '../Products.module.css'
import axiosInstance from "../../../api/axiosConfig";
import { useState, useEffect } from 'react';
function Filters() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [filteredPrice, setFilteredPrice] = useState('all');

    const fetchCategories = async () => {
        try {
            const response = await axiosInstance.get('Products/by-category'); // Realiza una solicitud GET a /api/products
            setCategories(response.data); // Actualiza el estado con los datos obtenidos
        } catch (err) {
            console.error("Error al obtener los productos", err); // Muestra el error en consola
            setError(err.message); // Guarda el mensaje de error en el estado
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);


    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        Categoria
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                    <ul>
                            {categories.map((cat) => (

                                <li
                                    className={styles.filterItem}
                                    key={cat.CAT_ID}
                                >
                                    <label>
                                        <input type="checkbox" />
                                        {cat.CAT_NAME}
                                    </label>
                                </li>    
                            
                            ))}
                    </ul>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Precio
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body d-flex flex-column   ">
                        <label
                            className="d-flex gap-2"
                        >
                            <input
                                type="radio"
                                checked={filteredPrice === 'biggest'}
                                onChange={() => setFilteredPrice('biggest')}
                            /> Mayor Precio
                        </label>
                        <label
                            className="d-flex gap-2"
                        >
                            <input
                                type="radio"
                                value="Mayor Precio"
                                checked={filteredPrice === 'smallest'}
                                onChange={() => setFilteredPrice('smallest')}
                            /> Menor Precio
                        </label>
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Alfabeticamente
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        <strong>This is the third item’s accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classNamees that we use to style each element. These classNamees control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It’s also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters;

