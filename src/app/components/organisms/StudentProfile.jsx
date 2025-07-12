'use client';

import React, { useEffect, useState } from 'react';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Paragraph from '../atoms/Paragraph';
import { useAuth } from '@/app/context/authContext';

const StudentProfile = () => {
  const { user, updateStudent } = useAuth();
  const student = user?.student || {};

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    nationality: '',
    gender: '',
    program_type: '',
    city: '',
  });

  useEffect(() => {
    if (student) {
      setForm({
        first_name: student.first_name || '',
        last_name: student.last_name || '',
        email: student.email || '',
        phone: student.phone || '',
        nationality: student.nationality || '',
        gender: student.gender || '',
        program_type: student.program_type || '',
        city: student.city || '',
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/students/${user?.student?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok) {
        updateStudent(data.student);
        alert('Profile updated successfully!');
      } else {
        alert(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen flex justify-center ">
      <div className="w-full ">
        <div className="text-center mb-8">
          <Heading level={4}>Edit Profile</Heading>
          <Paragraph level={5}>General Information</Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="First Name"
          />
          {/* Last Name */}
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="Last Name"
          />
          {/* Email (Disabled) */}
          <input
            name="email"
            value={form.email}
            disabled
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 cursor-not-allowed"
            placeholder="Email Address"
          />
          {/* Phone */}
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="Phone"
          />
          {/* Nationality */}
          <input
            name="nationality"
            value={form.nationality}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="Nationality"
          />
          {/* City */}
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="City"
          />
          {/* Program Type */}
          <input
            name="program_type"
            value={form.program_type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-full bg-gray-100 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
            placeholder="Program Type"
          />

          {/* Gender */}
          <div className="md:col-span-2">
            <label className="block text-black font-medium mb-2">Gender</label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm">
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={form.gender === 'male'}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2 text-black">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={form.gender === 'female'}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <Button type="submit" className="mt-4 w-full">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;
