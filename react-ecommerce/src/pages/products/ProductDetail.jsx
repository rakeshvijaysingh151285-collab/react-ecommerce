import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft, FiHeart, FiTruck, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ui/ProductCard';
import Loader from '../../components/ui/Loader';
import { searchProducts } from '../../services/productService';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { getProduct } = useProducts();

  useEffect(() => {
    const loadDetail = async () => {
      setLoading(true);
      const item = await getProduct(id);
      if (item) {
        setProduct(item);
        const relatedResponse = await searchProducts(item.name?.split(' ')[0] || '');
        setRelated(relatedResponse.data.filter((entry) => entry.id !== item.id).slice(0, 4));
      }
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <div className="rounded-3xl bg-white p-10 text-center text-slate-600 shadow-card">Product not found.</div>;

  const price = product.discount_price || product.price;
  const discount = product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

  return (
    <div className="space-y-8 pb-10">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
        <FiArrowLeft /> Back to products
      </button>
      <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-card lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <img src={product.image || 'https://via.placeholder.com/600x500'} alt={product.name} className="h-full w-full rounded-[2rem] object-cover" />
          </div>
          <div className="space-y-4 px-1">
            <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">{product.rating?.toFixed(1) || '4.5'} ★</span>
              <span>{product.reviews_count || 0} reviews</span>
              <span>{product.stock > 0 ? 'In stock' : 'Out of stock'}</span>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-3xl font-semibold text-slate-900">₹{price}</div>
              {discount > 0 && <p className="mt-2 text-sm text-emerald-600">Save {discount}% off the original price ₹{product.price}</p>}
            </div>
            <p className="text-sm leading-7 text-slate-600">{product.description || 'No description available yet for this product.'}</p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={product.stock === 0}
                onClick={() => addItem({ product_id: product.id, quantity })}
                className="btn-primary flex-1"
              >
                Add to cart
              </button>
              <button type="button" className="rounded-3xl border border-slate-200 bg-slate-100 px-5 py-3 text-slate-700 transition hover:border-primary hover:text-primary">
                <FiHeart className="inline-block" /> Wishlist
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <FiTruck /> Fast delivery
              </div>
              <div className="flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                <FiShield /> Secure payments
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-3xl border border-slate-200 p-6 bg-slate-50">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">Purchase options</h2>
            <div className="grid gap-3">
              <label className="block text-sm text-slate-700">
                Quantity
                <input
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  min={1}
                  type="number"
                  className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </label>
              <button onClick={() => navigate('/checkout')} className="rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">Go to checkout</button>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">Key features</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">High quality product and secure checkout.</li>
              <li className="flex items-center gap-2">Verified seller and fast shipping.</li>
              <li className="flex items-center gap-2">Designed for responsive mobile and desktop.</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-6 shadow-card">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Related items</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">People also viewed</h2>
          </div>
          <button type="button" className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200">View more</button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} onAdd={() => addItem({ product_id: item.id, quantity: 1 })} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
