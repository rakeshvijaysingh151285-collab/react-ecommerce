import { createContext, useContext, useMemo, useState } from 'react';
import { placeOrder, getUserOrders, getOrderDetail, cancelOrder, processPayment } from '../services/orderService';
import { toast } from 'react-toastify';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getUserOrders(params);
      setOrders(response.data);
      return response;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderDetail = async (id) => {
    setLoading(true);
    try {
      const response = await getOrderDetail(id);
      setOrderDetails(response.data);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const submitOrder = async (payload) => {
    setLoading(true);
    try {
      const response = await placeOrder(payload);
      toast.success(response.message);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const payOrder = async (payload) => {
    setLoading(true);
    try {
      const response = await processPayment(payload);
      toast.success(response.message);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancel = async (id) => {
    setLoading(true);
    try {
      const response = await cancelOrder(id);
      toast.success(response.message);
      return response.data;
    } catch (error) {
      return null;
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      orders,
      orderDetails,
      loading,
      fetchOrders,
      fetchOrderDetail,
      submitOrder,
      payOrder,
      cancel
    }),
    [orders, orderDetails, loading]
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => useContext(OrderContext);
