'use client';
import { useState } from 'react';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="px-8 py-4">
          <h1 className="text-3xl font-bold">Dunlin</h1>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Summaries</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Journal</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>General Ledger</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Charts of Accounts</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Reports</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-gray-300 hover:text-white">
                <span>Integrations</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex items-center justify-between">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300"
            />
            <FaSearch className="absolute top-2.5 left-3 text-gray-400" />
          </div>
          <div className="flex items-center space-x-4">
            <FaBell className="text-gray-600" />
            <FaUserCircle className="text-gray-600" />
            <span>Thomas Anree</span>
          </div>
        </header>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Summaries</h2>

          <div className="bg-white shadow-md rounded-lg overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">04/03/2024</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Transfer</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Google Ads</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Expense</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">Description</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">-$450.00</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">-$450.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add more transaction</button>
          </div>
        </section>
      </main>
    </div>
  );
}
