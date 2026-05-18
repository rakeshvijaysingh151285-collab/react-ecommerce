import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cart, loading, updateItem, removeItem, clearItems } = useCart();
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const total = useMemo(() => cart.subtotal, [cart.subtotal]);

  const changeQuantity = async (item, value) => {
    setProcessing(true);
    const updated = Math.max(1, item.quantity + value);
    await updateItem(item.id, updated);
    setProcessing(false);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Shopping cart</h1>
            <p className="text-sm text-slate-500">Review your items and proceed to checkout.</p>
          </div>
          <button onClick={clearItems} disabled={loading} className="btn-secondary w-full max-w-xs text-center">
            Clear cart
          </button>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-card">Loading cart...</div>
      ) : cart.items.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-card">
          <p className="text-xl font-semibold text-slate-900">Your cart is empty</p>
          <p className="mt-3 text-sm text-slate-600">Browse products and add favorites to your cart.</p>
          <Link to="/products" className="btn-primary mt-6 inline-flex">Shop products</Link>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[1.8fr_0.9fr]">
          <div className="space-y-5">
            {cart.items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.Product?.image || 'https://via.placeholder.com/120'} alt={item.Product?.name} className="h-28 w-28 rounded-3xl object-cover" />
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">{item.Product?.name}</h2>
                      <p className="text-sm text-slate-500">₹{item.price} × {item.quantity}</p>
                      <p className="mt-2 text-sm text-slate-500">Total: ₹{item.total_price}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 text-sm">
                    <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                      <button type="button" onClick={() => changeQuantity(item, -1)} disabled={processing || item.quantity <= 1} className="rounded-full p-2 text-slate-700 hover:bg-slate-200">
                        <FiMinus />
                      </button>
                      <span className="min-w-[2rem] text-center font-medium">{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item, 1)} disabled={processing} className="rounded-full p-2 text-slate-700 hover:bg-slate-200">
                        <FiPlus />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)} className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-700 hover:bg-rose-200">
                      <FiTrash2 /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Order summary</h3>
              <div className="grid gap-3 text-sm text-slate-600">
                <div className="flex justify-between"><span>Items</span><span>{cart.total_items}</span></div>
                <div className="flex justify-between"><span>Subtotal</span><span>₹{cart.subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Delivery</span><span>₹50.00</span></div>
                <div className="flex justify-between font-semibold text-slate-900"><span>Total</span><span>₹{(cart.subtotal + 50).toFixed(2)}</span></div>
              </div>
              <button onClick={() => navigate('/checkout')} className="btn-primary w-full">Proceed to checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
