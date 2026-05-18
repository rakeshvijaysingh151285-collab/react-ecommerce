import api from './api';

export const fetchProducts = (params) => api.get('/products', { params }).then((res) => res.data);
export const fetchProductById = (id) => api.get(`/products/${id}`).then((res) => res.data);
export const searchProducts = (query) => api.get('/products/search', { params: { q: query } }).then((res) => res.data);
export const fetchCategories = (params) => api.get('/categories', { params }).then((res) => res.data);
