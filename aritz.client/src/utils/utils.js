export const formatPrice = (price) => {
    // El 'es-ES' o 'es-AR' fuerza el uso de PUNTOS para miles
    return Number(price).toLocaleString('es-ES', {
        minimumFractionDigits: 0, // Si no quieres decimales
        maximumFractionDigits: 2  // Máximo 2 decimales
    });
};