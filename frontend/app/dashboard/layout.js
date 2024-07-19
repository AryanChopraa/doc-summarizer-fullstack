'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const DashboardLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    { name: 'Saved Summaries', path: '/dashboard/summary' },
    { name: 'History', path: '/dashboard/summary' },
    { name: 'Reports', path: '/dashboard/summary' },
    { name: 'Integrations', path: '/dashboard/summary' },
    { name: 'Profile', path: '/dashboard/summary' },
  ];

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row bg-gradient-to-br from-primary to-purple-300 transition-all duration-1000 ease-in-out mt-20">
        {!isMobile && (
          <div className="w-64 flex flex-col text-white bg-black rounded-xl ml-2">
            <div className="p-4">
              <h2 className="font-thin text-3xl">Menu</h2>
            </div>
            <nav className="flex-1">
              <ul>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link href={item.path}>
                      <div className={`pl-5 pr-2 py-4 hover:bg-blue-900 cursor-pointer text-md font-thin flex items-center rounded-full my-2 mx-2 ${item.name === "Saved Summaries" ? 'bg-blue-900' : ''}`}>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        <div className="flex-1 overflow-auto">
          <main className="p-4">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;