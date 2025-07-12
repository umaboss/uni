'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const UniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('universities');
    if (stored) {
      setUniversities(JSON.parse(stored));
    } else {
      const defaultUniversities = [
        {
          id: 1,
          name: 'Harvard University',
          email: 'info@harvard.edu',
          popular: true,
          createdAt: '2024-06-01',
        },
        {
          id: 2,
          name: 'Oxford University',
          email: 'contact@oxford.ac.uk',
          popular: false,
          createdAt: '2024-06-02',
        },
        {
          id: 3,
          name: 'Stanford University',
          email: 'admissions@stanford.edu',
          popular: true,
          createdAt: '2024-06-03',
        },
      ];
      setUniversities(defaultUniversities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('universities', JSON.stringify(universities));
  }, [universities]);

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this university?");
    if (!confirmDelete) return;

    const updated = universities.filter(uni => uni.id !== id);
    setUniversities(updated);
    showToastMessage("University deleted successfully.");
  };

  const handleTogglePopular = (id) => {
    const updated = universities.map(uni =>
      uni.id === id ? { ...uni, popular: !uni.popular } : uni
    );
    setUniversities(updated);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen relative">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Universities</h1>
            <p className="text-gray-600">Manage university listings and information</p>
          </div>
          <Link 
            href="/university/add"
            className="bg-[#0B6D76] hover:bg-[#094F56] text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">➕</span>
            <span>Add University</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b text-left">Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-center">Popular</th>
                <th className="py-3 px-4 border-b text-center">Created At</th>
                <th className="py-3 px-4 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {universities.map((uni) => (
                <tr key={uni.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 border-b font-medium text-gray-800">{uni.name}</td>
                  <td className="py-2 px-4 border-b text-gray-600">{uni.email}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleTogglePopular(uni.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none transition-colors duration-150 ${
                        uni.popular ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {uni.popular ? 'On' : 'Off'}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center text-gray-500">{uni.createdAt}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors mr-2" title="Edit">
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(uni.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {universities.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No universities found</div>
            <p className="text-gray-400 mt-2">Try adding a new university</p>
          </div>
        )}
      </div>

      {/* Toast message */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default UniversityList;
