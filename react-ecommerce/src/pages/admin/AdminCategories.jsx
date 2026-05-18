import { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { fetchAdminCategories } from '../../services/adminService';
import Loader from '../../components/ui/Loader';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetchAdminCategories({ page: 1, limit: 20 });
      setCategories(response.data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Admin categories</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Category management</h1>
          </div>
          <button className="btn-secondary inline-flex items-center gap-2"><FiRefreshCcw /> Refresh</button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div key={category.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-card">
              <h2 className="text-lg font-semibold text-slate-900">{category.name}</h2>
              <p className="mt-2 text-sm text-slate-600">{category.description || 'No description available.'}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">Status: {category.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
