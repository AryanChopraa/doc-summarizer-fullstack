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
          console.error('Authentication check failed');
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
          await checkAuth(); 
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
            console.log('Registering with:', { name, email, password });
            const response = await api.post('auth/register', { name, email, password });
            console.log('Registration response:', response.data);
            await checkAuth(); // Add this line to update the user state after registration
            toast.success('Registered successfully');
            return response.data; // Return the response data
        } catch (error) {
            console.error('Registration error:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed';
            toast.error(errorMessage);
            throw new Error(errorMessage);
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