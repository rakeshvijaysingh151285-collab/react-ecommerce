import { useEffect, useState } from 'react';
import { FiChevronRight, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { useOrders } from '../../context/OrderContext';
import Loader from '../../components/ui/Loader';

const statusMap = {
  pending: { label: 'Pending', color: 'text-amber-600' },
  confirmed: { label: 'Confirmed', color: 'text-blue-600' },
  shipped: { label: 'Shipped', color: 'text-slate-900' },
  delivered: { label: 'Delivered', color: 'text-emerald-600' },
  cancelled: { label: 'Cancelled', color: 'text-rose-600' }
};

const OrdersPage = () => {
  const { orders, loading, fetchOrders, cancel } = useOrders();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchOrders({ status: filter, page: 1, limit: 10 });
  }, [filter]);

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Orders</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Order history</h1>
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-card">No orders found yet. Place your first order today.</div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order #{order.order_number}</p>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">₹{order.final_amount}</h2>
                  <p className="mt-1 text-sm text-slate-600">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className={`rounded-full px-4 py-2 ${statusMap[order.status]?.color || 'text-slate-700'} bg-slate-100`}>{statusMap[order.status]?.label || order.status}</span>
                  {order.status === 'pending' && (
                    <button type="button" onClick={() => cancel(order.id)} className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 hover:bg-rose-100">Cancel</button>
                  )}
                </div>
              </div>
              <div className="mt-4 grid gap-3 rounded-3xl bg-slate-50 p-4 sm:grid-cols-2">
                <div className="text-sm text-slate-600">Payment status: <span className="font-semibold text-slate-900">{order.payment_status}</span></div>
                <div className="text-sm text-slate-600">Items: {order.OrderItems?.length || 0}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
