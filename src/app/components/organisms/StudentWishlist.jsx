'use client';

import React from 'react';
import Heading from '../atoms/Heading';

const StudentWishlist = () => {
  // Dummy wishlist data (empty for now)
  const wishlist = [];

  return (
    <div className=" flex justify-center ">
      <div className="w-full ">
        <div className="text-center mb-8">
          <Heading level={5}>Wishlist</Heading>
        </div>

        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-[700px] w-full text-sm md:text-base border border-gray-200">
            <thead className="bg-[#0B6D76] text-white">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left">Course</th>
                <th className="px-4 sm:px-6 py-3 text-left">University</th>
                <th className="px-4 sm:px-6 py-3 text-left">Starting Deadline Date</th>
                <th className="px-4 sm:px-6 py-3 text-left">Added At</th>
                <th className="px-4 sm:px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No wishlist items found
                  </td>
                </tr>
              ) : (
                wishlist.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-4">{item.courseName}</td>
                    <td className="px-4 sm:px-6 py-4">{item.category}</td>
                    <td className="px-4 sm:px-6 py-4">{item.deadlineDate}</td>
                    <td className="px-4 sm:px-6 py-4">{item.addedOn}</td>
                    <td className="px-4 sm:px-6 py-4">
                      <button className="bg-[#0B6D76] text-white px-3 py-1 rounded hover:bg-[#095a62] text-xs sm:text-sm">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentWishlist;
