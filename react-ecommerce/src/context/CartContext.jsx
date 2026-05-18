import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../services/cartService';
import { toast } from 'react-toastify';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total_items: 0 });
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    setLoading(true);
    try {
      const response = await getCart();
      setCart(response.data);
    } catch (error) {
      setCart({ items: [], subtotal: 0, total_items: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const addItem = async (payload) => {
    setLoading(true);
    try {
      const response = await addToCart(payload);
      await refreshCart();
      toast.success(response.message);
    } catch (error) {
      // error handled by api interceptor
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, quantity) => {
    setLoading(true);
    try {
      const response = await updateCartItem(id, { quantity });
      await refreshCart();
      toast.success(response.message);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    try {
      const response = await removeCartItem(id);
      await refreshCart();
      toast.success(response.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const clearItems = async () => {
    setLoading(true);
    try {
      const response = await clearCart();
      setCart({ items: [], subtotal: 0, total_items: 0 });
      toast.success(response.message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      cart,
      loading,
      refreshCart,
      addItem,
      updateItem,
      removeItem,
      clearItems
    }),
    [cart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
