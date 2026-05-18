export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2874f0',
        accent: '#fb641b',
        surface: '#ffffff',
        'surface-dark': '#111827',
        muted: '#6b7280',
        border: '#e5e7eb'
      },
      boxShadow: {
        card: '0 10px 25px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};
