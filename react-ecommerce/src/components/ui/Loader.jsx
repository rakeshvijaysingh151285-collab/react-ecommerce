const Loader = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-slate-600">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-primary" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default Loader;
