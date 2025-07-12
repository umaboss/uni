"use client";

import React from "react";

const whatsappEvents = [
  {
    id: 1,
    buttonClick: 23,
    pageHit: 120,
    buttonText: "Chat on WhatsApp",
    createdAt: "2024-06-01 10:30:00",
  },
  {
    id: 2,
    buttonClick: 15,
    pageHit: 80,
    buttonText: "Contact Us",
    createdAt: "2024-06-02 14:15:00",
  },
  {
    id: 3,
    buttonClick: 40,
    pageHit: 200,
    buttonText: "WhatsApp Support",
    createdAt: "2024-06-03 09:00:00",
  },
];

const WhatsAppEvents = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">WhatsApp Button Events</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Button Click</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Page Hit</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Button Text</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-r-xl">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {whatsappEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{event.buttonClick}</td>
                  <td className="py-3 px-4 text-gray-600">{event.pageHit}</td>
                  <td className="py-3 px-4 text-gray-600">{event.buttonText}</td>
                  <td className="py-3 px-4 text-gray-600">{event.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {whatsappEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No events found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatsAppEvents;