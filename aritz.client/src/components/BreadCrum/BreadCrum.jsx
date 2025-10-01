import { useLocation, Link } from "react-router-dom";
import styles from "./BreadCrum.module.css"
function BreadCrum({ id, name }) {
    const location = useLocation();

    const getBreadcrumbItems = () => {
        const pathnames = location.pathname.split('/').filter(x => x); // Divide la URL en partes

        switch (pathnames[0]) {
            case 'user':
                switch (pathnames[2]) {
                    case 'my-order': //Si estoy en order-details
                        return [
                            { name: 'Inicio', path: '/' },
                            { name: 'Mis Ordenes', path: '/user/my-requests' },
                            { name: `Orden #${id}`, path: `my-order/${id}` },
                        ];
                }
                switch (pathnames[1]) {
                    case 'my-account': //Si estoy en my-account
                        return [
                            { name: 'Inicio', path: '/' },
                            { name: 'Mi cuenta', path: '/user/my-account' },
                        ];
                }
                return [
                    { name: 'Inicio', path: '/' },
                    { name: 'Mis Ordenes', path: '/user/my-requests' },
                ];
            case 'product':
                switch (pathnames[1]) {
                    case 'product-detail':
                        return [
                            { name: 'Inicio', path: '/' },
                            { name: 'Productos', path: '/product' },
                            { name: `${name}`, path: `product/product-detail/${id}` },
                        ]
                }
                return [
                    { name: 'Inicio', path: '/' },
                    { name: 'Productos', path: '/product' }
                ];
            case 'cart':
                return [
                    { name: 'Inicio', path: '/' },
                    { name: 'Carrito', path: '/cart' } 
                ];
            default:
                return [];
        }
    }

    const breadcrumbItems = getBreadcrumbItems();

    return (
        <nav className={styles.breadCrumContainer}>
          {breadcrumbItems.map((item, index) => (
              <span
                  key={item.path}>
                  {index > 0 && ' > '}
                  {index === breadcrumbItems.length - 1 ? (
                      <span>{item.name}</span> // Último elemento no es un enlace
                  ) : (
                          <Link
                              className={styles.link}
                              to={item.path}
                              replace>{item.name}
                          </Link> // Elementos clicables
                  )}
              </span>
          ))}
      </nav>
  );
}

export default BreadCrum;