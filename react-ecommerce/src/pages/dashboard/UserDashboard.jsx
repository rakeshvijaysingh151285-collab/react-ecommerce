import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Hello, {user?.name || 'Shopper'}</h1>
        <p className="mt-2 text-sm text-slate-600">Welcome to your dashboard. Manage orders, update profile, and track recent purchases.</p>
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <Link to="/dashboard/profile" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-primary">
          <h2 className="text-xl font-semibold text-slate-900">Profile</h2>
          <p className="mt-2 text-sm text-slate-600">Update your contact details and shipping information.</p>
        </Link>
        <Link to="/dashboard/orders" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-primary">
          <h2 className="text-xl font-semibold text-slate-900">Orders</h2>
          <p className="mt-2 text-sm text-slate-600">View your order history and track recent status updates.</p>
        </Link>
        <Link to="/cart" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card transition hover:border-primary">
          <h2 className="text-xl font-semibold text-slate-900">Cart</h2>
          <p className="mt-2 text-sm text-slate-600">Review cart items and continue to checkout.</p>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
