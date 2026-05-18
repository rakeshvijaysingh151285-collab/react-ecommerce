import { useEffect, useState } from 'react';
import { FiBarChart2, FiUsers, FiPackage, FiDollarSign } from 'react-icons/fi';
import { fetchAdminStats } from '../../services/adminService';
import Loader from '../../components/ui/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const response = await fetchAdminStats();
      setStats(response.data);
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Admin dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Monitor sales, users, and product performance.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl bg-primary/10 p-6 text-slate-900 shadow-card">
          <div className="flex items-center gap-3 text-primary"><FiUsers className="h-6 w-6" /> Users</div>
          <p className="mt-4 text-4xl font-semibold">{stats.totalUsers}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-6 shadow-card">
          <div className="flex items-center gap-3 text-slate-900"><FiPackage className="h-6 w-6" /> Products</div>
          <p className="mt-4 text-4xl font-semibold">{stats.totalProducts}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-6 shadow-card">
          <div className="flex items-center gap-3 text-slate-900"><FiBarChart2 className="h-6 w-6" /> Orders</div>
          <p className="mt-4 text-4xl font-semibold">{stats.totalOrders}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 p-6 shadow-card">
          <div className="flex items-center gap-3 text-slate-900"><FiDollarSign className="h-6 w-6" /> Revenue</div>
          <p className="mt-4 text-4xl font-semibold">₹{stats.totalRevenue?.toFixed(2)}</p>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Monthly sales</h2>
          <p className="mt-3 text-sm text-slate-600">₹{stats.monthlySales?.toFixed(2)}</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Top products</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {stats.topProducts?.map((product) => (
              <li key={product.id} className="rounded-3xl border border-slate-200 p-4">{product.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
