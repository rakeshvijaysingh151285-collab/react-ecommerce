import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-xl rounded-[2rem] bg-white p-10 text-center shadow-card">
        <p className="text-sm uppercase tracking-[0.35em] text-primary">404 error</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-slate-600">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn-primary mt-8 inline-flex">Go back home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
