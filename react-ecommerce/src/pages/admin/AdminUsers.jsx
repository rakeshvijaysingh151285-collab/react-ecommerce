import { useEffect, useState } from 'react';
import { FiRefreshCcw } from 'react-icons/fi';
import { fetchAdminUsers } from '../../services/adminService';
import Loader from '../../components/ui/Loader';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetchAdminUsers({ page: 1, limit: 20 });
      setUsers(response.data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Admin users</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">User management</h1>
          </div>
          <button className="btn-secondary inline-flex items-center gap-2"><FiRefreshCcw /> Refresh</button>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="overflow-hidden rounded-3xl bg-white shadow-card">
          <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Role</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4">{user.name}</td>
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="px-4 py-4 capitalize">{user.role}</td>
                  <td className="px-4 py-4 capitalize">{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
