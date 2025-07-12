'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/app/components/atoms/Heading';
import { useAuth } from '@/app/context/authContext';
import Button from '@/app/components/atoms/Button';

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/students/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        login({
          token: data.token,
          user: data.user,
          student: data.student,
        });
        router.push('/dashboard');
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
    <div className="min-h-screen flex items-center  justify-center px-4 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl w-full items-center gap-[80px]">
        {/* Form Section */}
        <div className="w-full">
          <Heading level={3}>
            Login <span className="text-[#0B6D76]">As Consultant</span>
          </Heading>

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {error && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 rounded-full bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76] text-black"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-10 py-4 rounded-full bg-gray-100 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76] text-black"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 cursor-pointer text-gray-600"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center text-black gap-2">
                <input type="checkbox" />
                <span>Remember Me</span>
              </label>
              <button type="button" className="text-[#0B6D76] underline">
                Forgot Password
              </button>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Logging in...' : 'Submit'}
            </Button>

            <p className="text-sm text-center text-black">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/students')}
                className="text-[#0B6D76] underline"
              >
                Register As Student
              </button>
            </p>
          </form>
        </div>

        {/* Image Section */}
        <div className="relative rounded-3xl  shadow-lg hidden md:block">
          <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[#0B6D76] rounded-bl-3xl rounded-tl-3xl z-10"></div>
          <img
            src="/assets/dsic.png"
            alt="Free Consultation"
            className="w-full h-auto object-cover relative z-0 rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
}
