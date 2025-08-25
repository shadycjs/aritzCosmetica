import axios from 'axios';

// Crea una instancia de Axios con una configuración base
const axiosInstance = axios.create({
    baseURL: 'https://localhost:5001/api/' // Ruta base de tu backend
});

export default axiosInstance;