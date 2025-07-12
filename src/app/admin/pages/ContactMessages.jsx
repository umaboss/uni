'use client';

import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contactUs", {
        method: "GET",
      });
      const data = await res.json();
      console.log(data,"contact data")
      if (data.success) {
        setMessages(data.data);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">All Contact Messages</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">User Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">Loading...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">No messages found.</td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-800">{msg.user_name}</td>
                    <td className="py-3 px-4 text-gray-600">{msg.user_email}</td>
                    <td className="py-3 px-4 text-gray-600">{msg.phone_number}</td>
                    <td className="py-3 px-4 text-gray-600">{msg.office_location}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{msg.message || '-'}</td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setSelectedMsg(msg)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedMsg(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Message Details</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedMsg.user_name}</p>
              <p><strong>Email:</strong> {selectedMsg.user_email}</p>
              <p><strong>Phone:</strong> {selectedMsg.phone_number}</p>
              <p><strong>Location:</strong> {selectedMsg.office_location}</p>
              <p><strong>Message:</strong> {selectedMsg.message || '-'}</p>
              <p><strong>Date:</strong> {new Date(selectedMsg.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactMessages;




// 'use client';

// import React, { useState } from "react";
// import { Eye } from "lucide-react";

// const messages = [
//   { id: 1, name: "Ali Khan", email: "ali@email.com", phoneNumber: "0300-1234567", officeLocation: "Lahore", message: "Need help with admission.", date: "2024-06-01" },
//   { id: 2, name: "Sara Ahmed", email: "sara@email.com", phoneNumber: "0321-7654321", officeLocation: "Karachi", message: "Visa process details?", date: "2024-06-02" },
//   { id: 3, name: "Usman Tariq", email: "usman@email.com", phoneNumber: "0333-9876543", officeLocation: "Islamabad", message: "How to apply for scholarship?", date: "2024-06-03" },
// ];

// const ContactMessages = () => {
//   const [selectedMsg, setSelectedMsg] = useState(null);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">All Contact Messages</h1>
//       <div className="bg-white rounded-2xl shadow-lg p-6">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">User Name</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Phone</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Location</th>
//                 <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Message</th>
//                 <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {messages.map((msg) => (
//                 <tr key={msg.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="py-3 px-4 font-medium text-gray-800">{msg.name}</td>
//                   <td className="py-3 px-4 text-gray-600">{msg.email}</td>
//                   <td className="py-3 px-4 text-gray-600">{msg.phoneNumber}</td>
//                   <td className="py-3 px-4 text-gray-600">{msg.officeLocation}</td>
//                   <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{msg.message}</td>
//                   <td className="py-3 px-4 text-center">
//                     <button
//                       onClick={() => setSelectedMsg(msg)}
//                       className="text-blue-600 hover:text-blue-800 transition-colors"
//                       title="View"
//                     >
//                       <Eye className="w-5 h-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {messages.length === 0 && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No messages found.</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {selectedMsg && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
//             <button
//               onClick={() => setSelectedMsg(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
//             >
//               ×
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Message Details</h2>
//             <div className="space-y-2 text-sm text-gray-700">
//               <p><strong>Name:</strong> {selectedMsg.name}</p>
//               <p><strong>Email:</strong> {selectedMsg.email}</p>
//               <p><strong>Phone:</strong> {selectedMsg.phoneNumber}</p>
//               <p><strong>Location:</strong> {selectedMsg.officeLocation}</p>
//               <p><strong>Message:</strong> {selectedMsg.message}</p>
//               <p><strong>Date:</strong> {selectedMsg.date}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactMessages;
