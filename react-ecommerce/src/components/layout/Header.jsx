import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const { categories } = useProducts();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center">E</div>
          React E-Shop
        </Link>

        <div className="hidden flex-1 items-center gap-2 md:flex md:mx-6">
          <div className="relative flex w-full max-w-2xl items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 shadow-sm">
            <FiSearch className="text-slate-500" />
            <input
              type="search"
              placeholder="Search for products, brands and more"
              className="ml-3 w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-500"
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  navigate(`/products?search=${encodeURIComponent(event.target.value)}`);
                }
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200 md:inline-flex"
            onClick={() => navigate('/products')}
          >
            Products
          </button>
          <button
            type="button"
            className="relative rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200"
            onClick={() => navigate('/cart')}
            aria-label="Cart"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cart.total_items > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-semibold text-white">
                {cart.total_items}
              </span>
            )}
          </button>
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm text-slate-700 md:flex">
              <FiUser className="h-4 w-4" />
              <span>{user?.name || 'Customer'}</span>
              <button type="button" onClick={logout} className="text-slate-500 hover:text-slate-900">
                <FiLogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 md:inline-flex">
              Login
            </Link>
          )}
          <button
            type="button"
            className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className={`border-t border-slate-200 bg-white transition-all duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0 overflow-hidden'} md:max-h-full md:block`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-4 py-3 md:px-6">
          {categories.slice(0, 8).map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => navigate(`/products?category_id=${category.id}`)}
              className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs text-slate-700 transition hover:bg-primary hover:text-white md:text-sm"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
