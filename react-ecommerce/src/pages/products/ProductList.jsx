import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiFilter, FiSearch } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ui/ProductCard';
import Loader from '../../components/ui/Loader';

const sortOptions = [
  { value: 'price', label: 'Price low to high', order: 'ASC' },
  { value: 'price', label: 'Price high to low', order: 'DESC' },
  { value: 'created_at', label: 'Newest arrivals', order: 'DESC' }
];

const ProductList = () => {
  const { products, categories, loading, loadProducts, pageInfo } = useProducts();
  const { addItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category_id') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'created_at');
  const [order, setOrder] = useState(searchParams.get('order') || 'DESC');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const navigate = useNavigate();

  useEffect(() => {
    const params = {};
    if (query) params.search = query;
    if (selectedCategory) params.category_id = selectedCategory;
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    if (page) params.page = page;

    setSearchParams(params);
    loadProducts({ ...params, limit: 12 });
  }, [query, selectedCategory, sortBy, order, page]);

  const handleFilterReset = () => {
    setQuery('');
    setSelectedCategory('');
    setSortBy('created_at');
    setOrder('DESC');
    setPage(1);
    navigate('/products');
  };

  const pagingItems = useMemo(() => {
    return Array.from({ length: pageInfo.totalPages || 1 }, (_, index) => index + 1);
  }, [pageInfo.totalPages]);

  return (
    <div className="space-y-8 pb-10">
      <div className="grid gap-4 rounded-3xl bg-white p-6 shadow-card md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-primary">Shop collection</p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-900">Find the perfect product</h1>
          <p className="mt-3 text-sm text-slate-600">Filter by category, price, or newest arrivals.</p>
        </div>
        <div className="grid gap-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-3 text-sm text-slate-600"><FiSearch /> Search</div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              value={`${sortBy}:${order}`}
              onChange={(e) => {
                const [field, direction] = e.target.value.split(':');
                setSortBy(field);
                setOrder(direction);
              }}
              className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions.map((option) => (
                <option key={option.label} value={`${option.value}:${option.order}`}>{option.label}</option>
              ))}
            </select>
          </div>
          <button onClick={handleFilterReset} className="btn-secondary w-full">
            Reset filters
          </button>
        </div>
      </div>

      <section className="space-y-5">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.length === 0 ? (
              <div className="rounded-3xl bg-white p-8 text-center text-slate-600 shadow-card">No products found.</div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={() => addItem({ product_id: product.id, quantity: 1 })} />
              ))
            )}
          </div>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white p-4 shadow-card">
        <div className="text-sm text-slate-600">Showing page {pageInfo.page} of {pageInfo.totalPages || 1}</div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          {pagingItems.slice(0, 7).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`rounded-full px-4 py-2 text-sm ${pageNumber === page ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= pageInfo.totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, pageInfo.totalPages))}
            className="rounded-full border border-slate-200 bg-slate-100 px-3 py-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
