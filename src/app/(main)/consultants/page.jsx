'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConsultantSignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    company_name: '',
    number_of_employees: '',
    nationality: '',
    state: '',
    city: '',
    address: '',
    first_name: '',
    last_name: '',
    designation: '',
    email: '',
    mobile_number: '',
    password: '',
    confirm_password: '',
    comment: '',
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    // Validate passwords match
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/consultants/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.mobile_number,
          nationality: form.nationality,
          company_name: form.company_name,
          address: form.address,
          city: form.city,
          state: form.state,
          designation: form.designation,
          experience_years: form.number_of_employees,
          comment: form.comment
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        // Clear form
        setForm({
          company_name: '',
          number_of_employees: '',
          nationality: '',
          state: '',
          city: '',
          address: '',
          first_name: '',
          last_name: '',
          designation: '',
          email: '',
          mobile_number: '',
          password: '',
          confirm_password: '',
          comment: '',
          agree: false,
        });
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/consultantlogin');
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  const countries = ['Pakistan', 'India', 'USA', 'UK', 'Canada', 'Australia'];
  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Peshawar'];
  const employeeRanges = ['1-5', '6-10', '11-20', '20+'];
  const inputClass = 'w-full px-5 py-3.5 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500';
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#6DA7AD] via-white to-[#c7e6e9] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-white">Consultant <span className="text-[#0B6D76]">Registration</span></h3>
        </div>
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded mb-4 text-sm">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-700 border-opacity-30 p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <input className={inputClass} type="text" name="company_name" value={form.company_name} onChange={handleChange} placeholder="Company Name" required />
          <select name="number_of_employees" value={form.number_of_employees} onChange={handleChange} className={inputClass} required>
            <option value="">Select Employees</option>
            {employeeRanges.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select name="nationality" value={form.nationality} onChange={handleChange} className={inputClass} required>
            <option value="">Select Nationality</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className={inputClass} type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required />
          <select name="city" value={form.city} onChange={handleChange} className={inputClass} required>
            <option value="">Select City</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input className={inputClass} type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" required />
          <input className={inputClass} type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="First Name" required />
          <input className={inputClass} type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last Name" required />
          <input className={inputClass} type="text" name="designation" value={form.designation} onChange={handleChange} placeholder="Designation" required />
          <input className={inputClass} type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input className={inputClass} type="text" name="mobile_number" value={form.mobile_number} onChange={handleChange} placeholder="Mobile Number" required />
          <div className="relative">
            <input className={inputClass} type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} placeholder="Password" required />
            <span onClick={togglePasswordVisibility} className="absolute right-4 top-4 cursor-pointer text-white">{showPassword ? '🙈' : '👁️'}</span>
          </div>
          <div className="relative">
            <input className={inputClass} type={showConfirmPassword ? 'text' : 'password'} name="confirm_password" value={form.confirm_password} onChange={handleChange} placeholder="Confirm Password" required />
            <span onClick={toggleConfirmPasswordVisibility} className="absolute right-4 top-4 cursor-pointer text-white">{showConfirmPassword ? '🙈' : '👁️'}</span>
          </div>
          <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Comment" rows="3" className={`md:col-span-2 ${inputClass}`} />
          <div className="md:col-span-2 flex items-center space-x-2">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required />
            <label className="text-white">I agree to the Terms and Conditions</label>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
        <div className="mt-10 text-center">
          <p className="text-purple-300">
            Already have an account?{' '}
            <button
              onClick={() => router.push('/consultantlogin')}
              className="text-green-400 underline hover:text-white"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
