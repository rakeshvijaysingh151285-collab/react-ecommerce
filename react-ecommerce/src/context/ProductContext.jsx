import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProducts, fetchCategories, fetchProductById } from '../services/productService';
import { toast } from 'react-toastify';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState({ page: 1, limit: 12, total: 0, totalPages: 0 });

  const loadCategories = async () => {
    try {
      const response = await fetchCategories({ page: 1, limit: 50 });
      setCategories(response.data);
    } catch (error) {
      toast.error('Unable to load categories');
    }
  };

  const loadProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await fetchProducts(params);
      setProducts(response.data);
      setPageInfo(response.pagination);
      setFeatured(response.data.filter((item) => item.rating >= 4).slice(0, 6));
      setLatest([...response.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6));
      setTrending([...response.data].slice(0, 8));
    } catch (error) {
      toast.error('Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (error) {
      toast.error('Unable to load product');
      return null;
    }
  };

  useEffect(() => {
    loadCategories();
    loadProducts({ page: 1, limit: 12 });
  }, []);

  const value = useMemo(
    () => ({
      categories,
      products,
      featured,
      latest,
      trending,
      pageInfo,
      loading,
      loadProducts,
      getProduct,
      loadCategories
    }),
    [categories, products, featured, latest, trending, pageInfo, loading]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => useContext(ProductContext);
