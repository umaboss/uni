"use client";

import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

const consultants = [
  { id: 1, name: "Ali Khan", city: "Lahore", phone: "+923001234567", lastEducation: "Bachelors", interest: "MS Computer Science", country: "UK", createdAt: "2024-01-15" },
  { id: 2, name: "Sara Ahmed", city: "Karachi", phone: "+923004567890", lastEducation: "Intermediate", interest: "BS Business", country: "USA", createdAt: "2024-01-16" },
  { id: 3, name: "Usman Tariq", city: "Islamabad", phone: "+923008765432", lastEducation: "Matric", interest: "Diploma", country: "Canada", createdAt: "2024-01-17" },
];

const ApplyNowList = () => {
  const [list, setList] = useState(consultants);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setList((prev) => prev.filter((c) => c.id !== deleteId));
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Apply Now List</h1>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900 rounded-l-xl">Name</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">City</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Education</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Interest</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Country</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="py-2 px-4 text-center text-sm font-semibold text-gray-900 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4 font-medium text-gray-900">{c.name}</td>
                  <td className="py-2 px-4 text-gray-600">{c.city}</td>
                  <td className="py-2 px-4 text-gray-600">{c.phone}</td>
                  <td className="py-2 px-4 text-gray-600">{c.lastEducation}</td>
                  <td className="py-2 px-4 text-gray-600">{c.interest}</td>
                  <td className="py-2 px-4 text-gray-600">{c.country}</td>
                  <td className="py-2 px-4 text-gray-500">{c.createdAt}</td>
                  <td className="py-2 px-4 text-center flex justify-center gap-2">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(c.id);
                        setShowConfirm(true);
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {list.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No entries found</div>
            <p className="text-gray-400 mt-2">Try adding a new entry</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Are you sure?</h2>
            <p className="text-sm text-gray-600 mb-4">This will permanently delete the entry. This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => {
                  setShowConfirm(false);
                  setDeleteId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyNowList;
