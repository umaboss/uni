"use client";

import React from "react";

const contacts = [
  { id: 1, name: "Ali Khan", email: "ali@email.com", message: "Need help with admission.", date: "2024-06-01" },
  { id: 2, name: "Sara Ahmed", email: "sara@email.com", message: "Visa process details?", date: "2024-06-02" },
];

const InboxContact = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Inbox Contact Messages</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-r-xl">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contacts.map((msg) => (
                <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{msg.name}</td>
                  <td className="py-3 px-4 text-gray-600">{msg.email}</td>
                  <td className="py-3 px-4 text-gray-600">{msg.message}</td>
                  <td className="py-3 px-4 text-gray-600">{msg.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No messages found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxContact;
