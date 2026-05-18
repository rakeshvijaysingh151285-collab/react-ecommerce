import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 text-slate-700">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">React E-Shop</h3>
            <p className="text-sm leading-6 text-slate-600">A modern Flipkart-inspired shopping experience built with React and Tailwind.</p>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/products" className="hover:text-primary">All Products</Link></li>
              <li><Link to="/cart" className="hover:text-primary">Your Cart</Link></li>
              <li><Link to="/dashboard/orders" className="hover:text-primary">Order History</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>Privacy</li>
              <li>Returns</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Contact</h4>
            <p className="text-sm leading-6 text-slate-600">support@reacteshop.com</p>
            <p className="text-sm leading-6 text-slate-600">+1 234 567 890</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <span>© 2026 React E-Shop. Built for an integrated backend experience.</span>
          <span>Responsive User Experience • JWT Security • API-first</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
