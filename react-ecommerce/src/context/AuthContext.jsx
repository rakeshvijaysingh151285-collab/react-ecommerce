import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginUser, registerUser, getCurrentUser, logoutUser, updateProfile } from '../services/authService';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('REACT_ECOMMERCE_TOKEN'));
  const [loading, setLoading] = useState(true);

  const saveSession = (tokenValue, userData) => {
    if (tokenValue) {
      localStorage.setItem('REACT_ECOMMERCE_TOKEN', tokenValue);
    }
    if (userData) {
      localStorage.setItem('REACT_ECOMMERCE_USER', JSON.stringify(userData));
    }
    setToken(tokenValue);
    setUser(userData);
  };

  const clearSession = () => {
    localStorage.removeItem('REACT_ECOMMERCE_TOKEN');
    localStorage.removeItem('REACT_ECOMMERCE_USER');
    setToken(null);
    setUser(null);
  };

  const loadUser = async () => {
    const savedToken = localStorage.getItem('REACT_ECOMMERCE_TOKEN');
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      const response = await getCurrentUser();
      saveSession(savedToken, response.data);
    } catch (error) {
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    const response = await loginUser(credentials);
    saveSession(response.data.token, response.data.user);
    toast.success(response.message);
    return response.data.user;
  };

  const register = async (credentials) => {
    const response = await registerUser(credentials);
    saveSession(response.data.token, response.data.user);
    toast.success(response.message);
    return response.data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      // ignore server logout errors
    }
    clearSession();
    toast.info('Logged out successfully');
  };

  const profileUpdate = async (payload) => {
    const response = await updateProfile(payload);
    saveSession(token, response.data);
    toast.success(response.message);
    return response.data;
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    profileUpdate
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
