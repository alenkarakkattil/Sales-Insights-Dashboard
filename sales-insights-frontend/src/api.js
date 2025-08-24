import axios from 'axios';


const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE });


export const fetchProducts = () => api.get('/products').then(r => r.data);
export const fetchSummary = (params) => api.get('/summary', { params }).then(r => r.data);
export const fetchDaily = (params) => api.get('/daily', { params }).then(r => r.data);