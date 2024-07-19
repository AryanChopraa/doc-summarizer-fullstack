'use client'
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Spinner from '@/components/Spinner';

const AuthWrapper = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  return children;
};

export default AuthWrapper;