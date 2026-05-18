import api from './api';

export const getCart = () => api.get('/cart').then((res) => res.data);
export const addToCart = (payload) => api.post('/cart/add', payload).then((res) => res.data);
export const updateCartItem = (cartId, payload) => api.put(`/cart/${cartId}`, payload).then((res) => res.data);
export const removeCartItem = (cartId) => api.delete(`/cart/${cartId}`).then((res) => res.data);
export const clearCart = () => api.delete('/cart').then((res) => res.data);
