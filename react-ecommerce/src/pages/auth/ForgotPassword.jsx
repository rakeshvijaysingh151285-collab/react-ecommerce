import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] bg-white p-8 shadow-card">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Forgot your password?</h1>
      <p className="mb-6 text-sm text-slate-600">Enter your email address and we will send you instructions to reset your password.</p>
      <form className="space-y-5">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Email address</span>
          <input
            type="email"
            required
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="your@email.com"
          />
        </label>
        <button type="button" className="btn-primary w-full">Send reset link</button>
      </form>
      <p className="mt-6 text-sm text-slate-500">Remembered your password? <Link to="/login" className="font-semibold text-primary">Sign in</Link></p>
    </div>
  );
};

export default ForgotPassword;
