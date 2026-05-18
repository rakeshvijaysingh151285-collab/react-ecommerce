import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 shadow-card">
      <h1 className="mb-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
      <p className="mb-6 text-sm text-slate-600">Login to manage your orders, cart, and profile.</p>
      {error && <div className="mb-4 rounded-2xl bg-rose-100 px-4 py-3 text-sm text-rose-700">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            required
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            type="password"
            required
            minLength={6}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
        <button disabled={submitting} className="btn-primary w-full">{submitting ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <Link to="/forgot-password" className="hover:text-primary">Forgot password?</Link>
        <p>
          New here? <Link to="/register" className="font-semibold text-primary hover:text-blue-600">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
