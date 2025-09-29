import { useLocation, Link } from "react-router-dom";
function BreadCrum({id}) {
    const location = useLocation();

    const getBreadcrumbItems = () => { 
        const pathnames = location.pathname.split('/').filter(x => x); // Divide la URL en partes
        console.log(pathnames[0])

        switch (pathnames[0]) {
            case 'user':
                switch (pathnames[2]) {
                    case 'my-order': //Si estoy en order-details
                        return [
                            { name: 'Inicio', path: '/' },
                            { name: 'Mis Ordenes', path: '/user/my-requests' },
                            { name: `Orden #${id}`, path: `my-order/${id}` },
                        ]
                } 
                return [
                    { name: 'Inicio', path: '/' },
                    { name: 'Mis Ordenes', path: '/user/my-requests' },
                ];
            default:
                return [];
        }
    }

    const breadcrumbItems = getBreadcrumbItems();

    //pathnames.map((pathn, index) => (
    //   pathn == 'user' ? '' : ''
    //));


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