"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

const InboxComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("/api/complaint");
      if (res.data.success) {
        setComplaints(res.data.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirm) return;

    try {
      await axios.delete(`/api/complaint/${id}`);
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inbox Complaints</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Complaint</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complaints.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{msg.name}</td>
                  <td className="py-3 px-4 text-gray-600">{msg.email}</td>
                  <td className="py-3 px-4 text-gray-600">{msg.details}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ""}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Delete Complaint"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        )}
        {!loading && complaints.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No complaints found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxComplaints;
