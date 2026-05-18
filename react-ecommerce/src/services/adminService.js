import api from './api';

export const fetchAdminStats = () => api.get('/admin/dashboard/stats').then((res) => res.data);
export const fetchAdminProducts = (params) => api.get('/products', { params }).then((res) => res.data);
export const fetchAdminCategories = (params) => api.get('/categories', { params }).then((res) => res.data);
export const fetchAdminUsers = (params) => api.get('/users', { params }).then((res) => res.data);
export const fetchAdminOrders = (params) => api.get('/orders/admin/all', { params }).then((res) => res.data);
