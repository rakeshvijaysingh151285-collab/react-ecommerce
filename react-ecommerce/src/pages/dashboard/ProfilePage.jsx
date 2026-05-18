import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, profileUpdate } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zip_code: user?.zip_code || '',
    country: user?.country || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      await profileUpdate(form);
      setMessage('Profile updated successfully.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Unable to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-3xl font-semibold text-slate-900">Your profile</h1>
        <p className="mt-2 text-sm text-slate-600">Keep your shipping details and phone number up to date.</p>
      </div>
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2">
        {message && <div className="col-span-full rounded-3xl bg-emerald-50 p-4 text-sm text-emerald-700">{message}</div>}
        <label className="block text-sm text-slate-700">
          Full name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block text-sm text-slate-700">
          Phone
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} pattern="[0-9]{10}" className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block text-sm text-slate-700">
          Address
          <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" rows={4} />
        </label>
        <label className="block text-sm text-slate-700">
          City
          <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block text-sm text-slate-700">
          State
          <input value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block text-sm text-slate-700">
          ZIP code
          <input value={form.zip_code} onChange={(e) => setForm({ ...form, zip_code: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <label className="block text-sm text-slate-700">
          Country
          <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </label>
        <button type="submit" disabled={submitting} className="btn-primary w-full px-6 py-4 text-sm font-semibold">
          {submitting ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
