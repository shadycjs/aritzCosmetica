import { useLocation, Link } from "react-router-dom";
function BreadCrum({id}) {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter(x => x); // Divide la URL en partes
    const breadcrumbItems = [
        { name: 'Inicio', path: '/' },
        { name: 'Mis Ordenes', path: '/user/my-requests' },
        { name: `Orden #${id}`, path: `my-order/${id}` }
    ];

  return (
      <nav style={{ marginBottom: '20px' }}>
          {breadcrumbItems.map((item, index) => (
              <span key={item.path}>
                  {index > 0 && ' > '}
                  {index === breadcrumbItems.length - 1 ? (
                      <span>{item.name}</span> // Último elemento no es un enlace
                  ) : (
                          <Link to={item.path} replace>{item.name}</Link> // Elementos clicables
                  )}
              </span>
          ))}
      </nav>
  );
}

export default BreadCrum;