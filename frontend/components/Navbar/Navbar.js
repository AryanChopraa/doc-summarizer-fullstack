'use client'

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-white p-4 flex flex-col items-center justify-center">
      <nav className="bg-gray-500 bg-opacity-20 backdrop-blur-2xl fixed z-20 w-3/4 top-4 py-5  lg:rounded-full rounded-2xl mx-auto lg:mx-72">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-6">
          <Link href="/" className="flex items-center">
            <span className="ml-2 text-2xl font-thin text-white">summarize <span className="text-blue-600 rounded-md -ml-1">.ai</span></span>
          </Link>
          <button
            className="inline-flex items-center px-3 py-2 rounded lg:hidden"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          <div className={`w-full lg:inline-flex lg:flex-grow lg:w-auto ${isOpen ? 'block' : 'hidden'}`}>
            <div className="lg:flex lg:items-center lg:justify-between lg:space-x-8 lg:w-full text-white font-thin transition duration-150 ease-in-out">
             <div className='lg:ml-32 lg:flex lg:justify-evenly lg:gap-x-8 lg:w-full '>
             <a href="#" className="block lg:inline-block mt-4 lg:mt-0 text-lg relative group">
               <span className="relative">
                 Products
                 <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
               </span>
             </a>
             <a href="#" className="block lg:inline-block mt-4 lg:mt-0 text-lg relative group">
               <span className="relative">
                 Blogs
                 <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
               </span>
             </a>
             <a href="#" className="block lg:inline-block mt-4 lg:mt-0 text-lg relative group">
               <span className="relative">
                 Contact Us
                 <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
               </span>
             </a>
             </div>
             
              {user ? (
                <div className="flex flex-col lg:flex-row lg:space-x-3 mt-4 lg:mt-0">
                  <Link href="/dashboard/summary" className="text-lg text-white bg-blue-800 px-4 py-2 rounded-full mb-2 lg:mb-0 hover:bg-blue-700 transition-colors duration-300 text-center">Dashboard</Link>
                  <button onClick={logout} className="text-lg text-white px-4 py-2 border r-blue-800 rounded-full mb-2 lg:mb-0 hover:bg-red-600 hover:text-white transition-colors duration-300">Logout</button>
                </div>
              ) : (
                <div className="flex flex-col lg:flex-row lg:space-x-3 mt-4 lg:mt-0">
                  <Link href='/login' className="text-lg text-white bg-blue-800 px-4 py-2 rounded-full mb-2 lg:mb-0 hover:bg-blue-700 transition-colors duration-300 text-center">Login</Link>
                  <Link href='/register' className="text-lg text-white border px-4 py-2 rounded-full mb-2 lg:mb-0 hover:bg-blue-800 hover:text-white hover:border-none transition-colors duration-300 text-center">Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};