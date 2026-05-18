import api from './api';

export const placeOrder = (payload) => api.post('/orders', payload).then((res) => res.data);
export const getUserOrders = (params) => api.get('/orders', { params }).then((res) => res.data);
export const getOrderDetail = (id) => api.get(`/orders/${id}`).then((res) => res.data);
export const cancelOrder = (id) => api.put(`/orders/${id}/cancel`).then((res) => res.data);
export const processPayment = (payload) => api.post('/payments/process', payload).then((res) => res.data);
export const getPayment = (orderId) => api.get(`/payments/${orderId}`).then((res) => res.data);
