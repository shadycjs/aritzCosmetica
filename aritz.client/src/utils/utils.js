export const formatPrice = (price) => {
    // El 'es-ES' o 'es-AR' fuerza el uso de PUNTOS para miles
    return Number(price).toLocaleString('es-ES', {
        minimumFractionDigits: 0, // Si no quieres decimales
        maximumFractionDigits: 2  // Máximo 2 decimales
    });
};

export const formatDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);

    // Configuración para dd/mm/yyyy hh:mm
    return date.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Para usar formato 24 horas (20:45 en vez de 8:45 PM)
    }).replace(',', ''); // El replace quita la coma que a veces pone JS entre fecha y hora
};