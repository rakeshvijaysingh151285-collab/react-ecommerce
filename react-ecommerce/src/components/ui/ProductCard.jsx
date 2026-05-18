import { Link } from 'react-router-dom';
import { FiShoppingBag, FiStar } from 'react-icons/fi';

const ProductCard = ({ product, onAdd }) => {
  const price = product.discount_price || product.price;
  const discount = product.discount_price ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/products/${product.id}`} className="block p-4">
        <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
          <img
            src={product.image || 'https://via.placeholder.com/400x320?text=Product'}
            alt={product.name}
            className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2">{product.short_description || product.description || 'High quality product'}</p>
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <span>₹{price}</span>
            {discount > 0 && <span className="text-xs font-medium text-emerald-600">{discount}% off</span>}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <FiStar className="h-4 w-4 text-amber-500" />
            <span>{product.rating?.toFixed(1) || '4.5'}</span>
            <span>• {product.reviews_count || 0} reviews</span>
          </div>
        </div>
      </Link>
      <div className="border-t border-slate-200 px-4 py-3">
        <button
          type="button"
          onClick={() => onAdd(product)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
        >
          <FiShoppingBag /> Add to cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
