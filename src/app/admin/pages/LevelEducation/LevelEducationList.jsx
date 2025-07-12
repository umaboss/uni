'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const LevelEducationList = () => {
  const [levelEducations, setLevelEducations] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('levelEducations');
    if (stored) setLevelEducations(JSON.parse(stored));
  }, []);

  const updateStorage = (data) => {
    setLevelEducations(data);
    localStorage.setItem('levelEducations', JSON.stringify(data));
  };

  const handleDelete = (id) => {
    const updated = levelEducations.filter(item => item.id !== id);
    updateStorage(updated);
    alert("🗑️ Level of education deleted successfully.");
  };

  const toggleFeatured = (id) => {
    const updated = levelEducations.map(item =>
      item.id === id ? { ...item, isFeatured: !item.isFeatured } : item
    );
    updateStorage(updated);
  };

  const duplicateLevel = (edu) => {
    const duplicate = {
      ...edu,
      id: Date.now(),
      title: `${edu.title} Copy`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const updated = [...levelEducations, duplicate];
    updateStorage(updated);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Level of Education</h1>
          <button
            onClick={() => router.push('/level-education/add')}
            className="bg-[#0B6D76] text-white px-4 py-2 rounded-lg"
          >
            Add Level
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Font Awesome</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3">Is Featured</th>
              <th className="px-4 py-3">Created At</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {levelEducations.map(edu => (
              <tr key={edu.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{edu.title}</td>
                <td className="px-4 py-3">{edu.fontAwesome}</td>
                <td className="px-4 py-3">{edu.isActive ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3">
                  <label className="inline-flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      checked={edu.isFeatured}
                      onChange={() => toggleFeatured(edu.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 relative">
                      <div className={`absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all ${edu.isFeatured ? 'translate-x-full' : ''}`} />
                    </div>
                  </label>
                </td>
                <td className="px-4 py-3">{edu.createdAt}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      className="text-blue-600"
                      onClick={() => router.push(`/level-education/edit/${edu.id}`)}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-green-600"
                      onClick={() => duplicateLevel(edu)}
                    >
                      📋
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => {
                        const confirmDelete = confirm('Are you sure you want to delete this?');
                        if (confirmDelete) handleDelete(edu.id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {levelEducations.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">
            No level education records found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LevelEducationList;
