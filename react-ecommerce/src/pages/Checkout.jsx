import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const Checkout = () => {
  const { cart } = useCart();
  const { submitOrder, payOrder } = useOrders();
  const [details, setDetails] = useState({
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_zip: '',
    shipping_country: '',
    payment_method: 'card',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const totalAmount = useMemo(() => cart.subtotal + 50 + cart.subtotal * 0.05, [cart.subtotal]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const order = await submitOrder(details);
      if (order?.id) {
        await payOrder({ order_id: order.id });
        navigate('/dashboard/orders');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-8 pb-10 xl:grid-cols-[1.2fr_0.8fr]">
      <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-card">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Checkout</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Shipping details</h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-700">
            Address
            <textarea
              value={details.shipping_address}
              onChange={(e) => setDetails({ ...details, shipping_address: e.target.value })}
              required
              rows={3}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-700">
            City
            <input
              value={details.shipping_city}
              onChange={(e) => setDetails({ ...details, shipping_city: e.target.value })}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-700">
            State
            <input
              value={details.shipping_state}
              onChange={(e) => setDetails({ ...details, shipping_state: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-700">
            ZIP / Postal code
            <input
              value={details.shipping_zip}
              onChange={(e) => setDetails({ ...details, shipping_zip: e.target.value })}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Country
            <input
              value={details.shipping_country}
              onChange={(e) => setDetails({ ...details, shipping_country: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="block text-sm text-slate-700">
            Notes
            <input
              value={details.notes}
              onChange={(e) => setDetails({ ...details, notes: e.target.value })}
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">Payment method</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['card', 'wallet', 'cod'].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setDetails({ ...details, payment_method: method })}
                className={`rounded-3xl border px-4 py-3 text-sm font-medium transition ${details.payment_method === method ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 bg-white text-slate-700 hover:border-primary'}`}
              >
                {method.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button disabled={submitting} type="submit" className="btn-primary w-full">{submitting ? 'Placing order...' : 'Place order securely'}</button>
      </form>

      <aside className="space-y-6 rounded-3xl bg-white p-6 shadow-card">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Order details</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Summary</h2>
        </div>
        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <div className="flex justify-between"><span>Items</span><span>{cart.total_items}</span></div>
          <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax (5%)</span><span>₹{(cart.subtotal * 0.05).toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>₹50.00</span></div>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-lg font-semibold text-slate-900"><span>Total</span><span>₹{totalAmount.toFixed(2)}</span></div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Why choose us?</p>
          <ul className="mt-3 space-y-2">
            <li>Secure payments</li>
            <li>Shipping to your address</li>
            <li>Fast support and easy returns</li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Checkout;
