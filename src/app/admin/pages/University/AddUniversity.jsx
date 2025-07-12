'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddUniversity = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    city: '',
    phone: '',
    country: '',
    schemaMarkupQuestion: '',
    schemaMarkupAnswer: '',
    rating: '',
    reviewDate: '',
    authorName: '',
    publisherName: '',
    reviewerName: '',
    reviewDescription: '',
    address: '',
    established: '',
    teachingLanguage: '',
    intake: '',
    scholarship: '',
    status: 'Active',
    logo: '',
    about: '',
    guide: '',
    accommodation: '',
    feeStructure: '',
    isPopular: false,
    createdAt: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('universities');
    const universities = stored ? JSON.parse(stored) : [];
    universities.push({ id: Date.now(), ...formData });
    localStorage.setItem('universities', JSON.stringify(universities));
    alert("University has been successfully added.");
    setTimeout(() => {
      router.push('/university');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => router.push('/university')}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          >
            ←
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Add University</h1>
            <p className="text-gray-600">Register a new university in the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => (
              key !== 'logo' && key !== 'isPopular' && key !== 'createdAt' && (
                <div key={key} className="col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/schema Markup/, 'Schema Markup').replace(/fee Structure/, 'Fee Structure')} *
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required={key !== 'about' && key !== 'guide' && key !== 'accommodation'}
                    placeholder={key.replace(/([A-Z])/g, ' $1')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  />
                </div>
              )
            ))}

            <div className="col-span-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Popular University</label>
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="w-4 h-4"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">University Logo (400x400)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors duration-200">
                <div className="text-4xl mb-4">📤</div>
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                <input type="file" className="hidden" accept="image/*" />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="bg-[#0B6D76] text-white px-8 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:bg-[#095c64]"
            >
              <span className="text-xl">💾</span>
              <span>Save University</span>
            </button>
            <button
              type="button"
              onClick={() => router.push('/university')}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUniversity;
