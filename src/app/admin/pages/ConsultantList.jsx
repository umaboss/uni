'use client';

import React, { useState } from "react";
import { Eye } from "lucide-react";

const consultants = [
  {
    id: 1,
    name: "Ali Khan",
    email: "ali.khan@email.com",
    mobile: "03001234567",
    nationality: "Pakistani",
    createdAt: "2024-06-01",
  },
  {
    id: 2,
    name: "Sara Ahmed",
    email: "sara.ahmed@email.com",
    mobile: "03111234567",
    nationality: "Pakistani",
    createdAt: "2024-06-05",
  },
  {
    id: 3,
    name: "Usman Tariq",
    email: "usman.tariq@email.com",
    mobile: "03211234567",
    nationality: "Pakistani",
    createdAt: "2024-06-10",
  },
];

const ConsultantList = () => {
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Consultant List</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Mobile</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Nationality</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {consultants.map((consultant) => (
                <tr key={consultant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{consultant.name}</td>
                  <td className="py-3 px-4 text-gray-600">{consultant.email}</td>
                  <td className="py-3 px-4 text-gray-600">{consultant.mobile}</td>
                  <td className="py-3 px-4 text-gray-600">{consultant.nationality}</td>
                  <td className="py-3 px-4 text-gray-600">{consultant.createdAt}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setSelectedConsultant(consultant)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedConsultant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Consultant Details</h2>
              <button
                onClick={() => setSelectedConsultant(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-gray-700">
              <p><span className="font-semibold">Name:</span> {selectedConsultant.name}</p>
              <p><span className="font-semibold">Email:</span> {selectedConsultant.email}</p>
              <p><span className="font-semibold">Mobile:</span> {selectedConsultant.mobile}</p>
              <p><span className="font-semibold">Nationality:</span> {selectedConsultant.nationality}</p>
              <p><span className="font-semibold">Created At:</span> {selectedConsultant.createdAt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantList;
