"use client";
import React, { useState, useEffect } from "react";
import { Eye, Pencil } from "lucide-react";

const GuideList = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch guides from API
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/guides');
        if (!response.ok) throw new Error('Failed to fetch guides');
        const data = await response.json();
        setGuides(data);
      } catch (error) {
        console.error('Error fetching guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  const togglePopular = async (id) => {
    try {
      // Update popular status in database
      const response = await fetch(`/api/guides/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !guides.find(g => g.id === id)?.is_featured })
      });

      if (response.ok) {
        setGuides((prev) =>
          prev.map((g) =>
            g.id === id ? { ...g, is_featured: !g.is_featured } : g
          )
        );
      }
    } catch (error) {
      console.error('Error updating guide:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Loading guides...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Guide List</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Image</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Title</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Type</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Active</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Featured</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-600">Created At</th>
              <th className="py-3 px-4 text-center font-semibold text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {guides.map((guide) => (
              <tr key={guide.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  {guide.image ? (
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-xs">
                      No Image
                    </div>
                  )}
                </td>
                <td className="py-3 px-4 font-medium text-gray-800">{guide.title}</td>
                <td className="py-3 px-4 text-gray-600">{guide.guide_type}</td>
                <td className="py-3 px-4 text-center">
                  <span className={guide.is_active ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                    {guide.is_active ? "Yes" : "No"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={guide.is_featured || false}
                    onChange={() => togglePopular(guide.id)}
                    className="w-4 h-4 accent-teal-600"
                  />
                </td>
                <td className="py-3 px-4 text-gray-600">
                  {new Date(guide.created_at).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setSelected(guide);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="text-green-600 hover:text-green-800" title="Edit">
                      <Pencil className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {guides.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">No guides available.</div>
        )}
      </div>

      {/* Modal */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full relative">
            <button
              onClick={() => {
                setShowModal(false);
                setSelected(null);
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Guide Details</h2>
            <div className="space-y-2 text-sm">
              {selected.image && (
                <img src={selected.image} alt={selected.title} className="w-full h-32 object-cover rounded mb-4" />
              )}
              <p><strong>Title:</strong> {selected.title}</p>
              <p><strong>Type:</strong> {selected.guide_type}</p>
              <p><strong>Sub Title:</strong> {selected.sub_title || 'N/A'}</p>
              <p><strong>Active:</strong> {selected.is_active ? "Yes" : "No"}</p>
              <p><strong>Featured:</strong> {selected.is_featured ? "Yes" : "No"}</p>
              <p><strong>Created:</strong> {new Date(selected.created_at).toLocaleDateString()}</p>
              {selected.description && (
                <div>
                  <strong>Description:</strong>
                  <div className="mt-1 text-xs text-gray-600 max-h-20 overflow-y-auto" 
                       dangerouslySetInnerHTML={{ __html: selected.description.substring(0, 200) + '...' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideList;
