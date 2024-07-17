"use client"
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { api } from '@/utils/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        try {
          const response = await api.get('/profile');
          console.log(response.data);
          setUser(response.data);
        } catch (error) {
          console.error('Authentication check failed:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }, []);
    
      useEffect(() => {
        checkAuth();
      }, [checkAuth]);
    
      const login = async (email, password) => {
        try {
          const response = await api.post('auth/login', { email, password });
          await checkAuth(); // Fetch user data after successful login
          toast.success('Logged in successfully');
          return response.data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Login failed';
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
      };

  const register = async (name, email, password) => {
    try {
      const response = await api.post('auth/register', { name, email, password });
      console.log(response.data);
      toast.success('Registered successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
      throw error;
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await api.put('/profile/update', data);
      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};