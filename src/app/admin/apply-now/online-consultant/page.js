'use client';

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Eye, Trash2, X } from "lucide-react";

export default function OnlineConsultantPage() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/applynow")
      .then(res => res.json())
      .then(data => {
        setConsultants(data.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch consultants", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this entry?");
    if (!confirm) return;

    try {
      await fetch(`/api/applynow/${id}`, { method: "DELETE" });
      fetchData(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <Layout>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Online Consultant Applications</h1>
          <p className="text-gray-500 mt-1">Review recent form submissions from users who applied online.</p>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-4 py-3">Consultant Name	</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Nationality</th>
                  <th className="px-4 py-3">Interest Country</th>
                  <th className="px-4 py-3">city</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultants.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.name}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{item.email}</td>
                    <td className="px-4 py-3">{item.phone_number}</td>
                    <td className="px-4 py-3">{item.intrested_country}</td>
                    <td className="px-4 py-3">{item.city}</td>
                    <td className="px-4 py-3">{item.intrested_country}</td>
                    <td className="px-4 py-3">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3 flex space-x-2">
                      <button onClick={() => setSelectedItem(item)} className="text-blue-600 hover:text-blue-800">
                        <Eye size={18} />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {consultants.length === 0 && (
              <p className="text-gray-500 text-center py-6">No applications found.</p>
            )}
          </div>
        )}

        {/* 👁️ View Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">Application Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Name:</strong> {selectedItem.name}</p>
                <p><strong>Phone:</strong> {selectedItem.phone_number}</p>
                <p><strong>City:</strong> {selectedItem.city}</p>
                <p><strong>Last Education:</strong> {selectedItem.last_education}</p>
                <p><strong>Interested Country:</strong> {selectedItem.intrested_country}</p>
                <p><strong>Date:</strong> {new Date(selectedItem.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
