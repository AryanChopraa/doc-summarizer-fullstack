'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await register(name, email, password);
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-32 text-white px-6 lg:px-0">
      <h1 className="text-5xl font-thin mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block  mb-2 font-thin">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-4 border border-blue-800 rounded-2xl bg-gray-900"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-thin">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 border border-blue-800 rounded-2xl bg-gray-900"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-thin">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 border border-blue-800 rounded-2xl bg-gray-900"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 font-thin">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full px-6 py-4 border border-blue-800 rounded-2xl bg-gray-900"
            required
          />
        </div>
        
        <button type="submit" className="w-full px-6 py-4 bg-blue-800 rounded-2xl hover:bg-blue-600 font-thin">
          Register
        </button>

      </form>
      <div className='flex items-center justify-center mt-6 font-thin text-sm'>
        Already have an account?{' '}
        <Link href="/login" className="text-blue-500 hover:text-blue-700 ml-2">
          Login
        </Link>
      </div>
    </div>
  );
}