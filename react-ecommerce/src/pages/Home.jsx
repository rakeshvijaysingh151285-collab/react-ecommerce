import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiSearch } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import Loader from '../components/ui/Loader';

const Home = () => {
  const { user } = useAuth();
  const { cart, addItem } = useCart();
  const { categories, featured, latest, trending, loadProducts, loading } = useProducts();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts({ page: 1, limit: 12 });
  }, []);

  return (
    <div className="space-y-10 pb-10">
      <section className="grid gap-6 rounded-[2rem] bg-gradient-to-r from-primary to-sky-500 p-8 text-white shadow-xl md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-100">Flipkart inspired experience</p>
          <h1 className="max-w-xl text-4xl font-semibold md:text-5xl">Shop smart, save time, and discover the best deals.</h1>
          <p className="max-w-2xl text-sm leading-7 text-cyan-100/90">Browse fresh trends, fast delivery, and curated categories with secure checkout.</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={() => navigate('/products')} className="btn-primary inline-flex items-center gap-2 justify-center">
              Explore products <FiArrowRight />
            </button>
            <button onClick={() => navigate('/cart')} className="btn-secondary inline-flex items-center justify-center">
              View cart ({cart.total_items})
            </button>
          </div>
          <div className="rounded-full bg-white/10 p-4">
            <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-slate-900 shadow-sm">
              <FiSearch className="text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(event) => event.key === 'Enter' && navigate(`/products?search=${encodeURIComponent(search)}`)}
                placeholder="Search for mobiles, fashion, electronics..."
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>
        <div className="relative rounded-[2rem] bg-white/10 p-6">
          <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="absolute left-8 bottom-10 h-14 w-14 rounded-full bg-cyan-300/60 blur-2xl" />
          <div className="mx-auto h-full max-w-md">
            <img src="https://images.unsplash.com/photo-1561839560-76cf8b14d91e?auto=format&fit=crop&w=800&q=80" alt="Hero" className="h-full w-full rounded-[2rem] object-cover shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Recommended categories</h2>
          <div className="grid gap-3">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(`/products?category_id=${category.id}`)}
                className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Trending products</h2>
          <div className="space-y-3">
            {trending.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-3">
                <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="h-16 w-16 rounded-3xl object-cover" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">₹{item.discount_price || item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">Why shop with us</h2>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>Fast delivery and secure payments.</li>
            <li>Curated product collection from trusted sellers.</li>
            <li>Real-time order tracking and wallet support.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Featured collection</p>
            <h2 className="text-3xl font-semibold text-slate-900">Top picks for you</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-primary transition hover:text-blue-600">Browse all products</Link>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} onAdd={() => addItem({ product_id: product.id, quantity: 1 })} />
            ))}
          </div>
        )}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-primary p-8 text-white shadow-xl">
          <h3 className="text-2xl font-semibold">Join our shopping community</h3>
          <p className="mt-4 text-sm leading-7 text-slate-200">Enjoy modern search, secure JWT authentication, and responsive checkout in one polished app.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-white/10 p-4">Low prices, every day</div>
            <div className="rounded-3xl bg-white/10 p-4">Easy order tracking</div>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <h3 className="text-2xl font-semibold text-slate-900">Latest launches</h3>
          <div className="mt-6 grid gap-4">
            {latest.slice(0, 4).map((product) => (
              <div key={product.id} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4">
                <img src={product.image || 'https://via.placeholder.com/90'} alt={product.name} className="h-20 w-20 rounded-3xl object-cover" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{product.name}</h4>
                  <p className="text-sm text-slate-500">₹{product.discount_price || product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
