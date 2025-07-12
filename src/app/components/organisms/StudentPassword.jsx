'use client';

import React, { useState } from 'react';
import Heading from '../atoms/Heading';
import { useAuth } from '@/app/context/authContext';

const StudentPassword = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/students/${user?.student?.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Password updated successfully!');
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        alert(data.message || 'Failed to update password');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className=''>
     <Heading level={5}> <div className=" text-center mb-6">Change Password</div></Heading>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* One line for all 3 inputs */}
        <div className="grid grid-cols-2  gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Current"
              className="w-full pl-12 pr-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New"
              className="w-full pl-12 pr-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm"
              className="w-full pl-12 pr-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-gray-200 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="bg-[#0B6D76] text-white w-full py-4 rounded-md hover:bg-[#095a62]"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentPassword;
