"use client"

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Auth App
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/dashboard" className="mr-4">
                Dashboard
              </Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">
                Login
              </Link>
              <Link href="/register" className="bg-blue-500 px-4 py-2 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};