'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddLevelEducation = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    fontAwesome: '',
    isActive: true,
    isFeatured: false,
    createdAt: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0]
    };

    const existing = JSON.parse(localStorage.getItem('levelEducations') || '[]');
    const updated = [...existing, newData];
    localStorage.setItem('levelEducations', JSON.stringify(updated));

    alert('✅ Level Education Added Successfully');

    setTimeout(() => {
      router.push('/level-education');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-xl mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Level of Education</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Post Title *</label>
          <input
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Font Awesome Icon *</label>
          <input
            name="fontAwesome"
            required
            value={formData.fontAwesome}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Is Featured
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddLevelEducation;
