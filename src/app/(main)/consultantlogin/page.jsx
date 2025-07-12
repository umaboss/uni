'use client';

import React, { useState } from 'react';
import Heading from '../components/atoms/Heading';
import { useRouter } from 'next/navigation';
import { useUser } from '../UserContext';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useUser();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/consultants/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token and user data
        localStorage.setItem('token', data.accessToken);
        const userData = {
          type: 'consultant',
          name: data.first_name ? `${data.first_name} ${data.last_name || ''}` : data.email,
          email: data.email,
          id: data.id
        };
        localStorage.setItem('user', JSON.stringify(userData));
        login(userData);
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex-col gap-[20px] from-[#6DA7AD] via-white to-[#c7e6e9] py-12 px-4 flex items-center justify-center">
      <Heading level={3}>
        Consultant <span className="text-[#0B6D76]">Login</span>
      </Heading>
      <div className="max-w-md w-full bg-gray-800 bg-opacity-60 backdrop-blur-lg border border-gray-700 border-opacity-30 text-white rounded-3xl shadow-2xl p-10">
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded mt-4 text-sm">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-3 rounded mt-4 text-sm">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm mb-2 text-cyan-200">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm mb-2 text-cyan-200">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-3.5 bg-gray-700 bg-opacity-50 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Enter your password"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-white cursor-pointer text-sm"
            >
              {showPassword ? '🙈' : '👁️'}
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transition disabled:opacity-50"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-purple-300 text-sm">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/consultants')}
            className="text-green-400 underline hover:text-white transition"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}
