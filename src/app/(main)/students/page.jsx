'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Heading from '@/app/components/atoms/Heading';
import { Input } from '../free-consultation/page';
import Button from '@/app/components/atoms/Button';
import { useAuth } from '@/app/context/authContext';

export default function StudentForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    nationality: '',
    program_type: '',
    gender: '',
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const validateForm = () => {
    const newErrors = {};
    if (!form.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!form.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm_password) newErrors.confirm_password = 'Passwords do not match';
    if (!form.gender) newErrors.gender = 'Gender is required';
    if (!form.program_type) newErrors.program_type = 'Program type is required';
    if (!form.nationality) newErrors.nationality = 'Nationality is required';
    if (!form.agree) newErrors.agree = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/students/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Fixed login object with student name and email
        login({
          token: data.token,
          student: {
            id: data.student.id,
            email: data.student.email,
            first_name: data.student.first_name,
            last_name: data.student.last_name,
          },
        });
        router.push('/dashboard');
      } else {
        setErrors({ server: data.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      setErrors({ server: 'Network error. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatLabel = (label) => label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div>
      <div className="text-center banner-bottom-space">
        <Heading level={3} className="text-center lg:text-left">
          Registration <span className="text-teal-600">As Student</span>
        </Heading>
      </div>

      <div className="min-h-screen bg-white py-12 px-4 flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            {message && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{message}</div>}
            {errors.server && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{errors.server}</div>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(form).map(([field, value]) => {
                if (['agree', 'gender', 'nationality', 'program_type'].includes(field)) return null;
                const isPassword = field === 'password' || field === 'confirm_password';
                return (
                  <div key={field}>
                    <Input
                      id={field}
                      type={
                        isPassword
                          ? field === 'password'
                            ? showPassword ? 'text' : 'password'
                            : showConfirmPassword ? 'text' : 'password'
                          : 'text'
                      }
                      name={field}
                      value={value}
                      onChange={handleChange}
                      placeholder={formatLabel(field)}
                      className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none"
                    />
                    {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
                  </div>
                );
              })}

              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none"
              >
                <option value="">Select Nationality</option>
                <option value="Pakistan">Pakistan</option>
                <option value="India">India</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
              {errors.nationality && <p className="text-sm text-red-500 mt-1">{errors.nationality}</p>}

              <Input
                id="program_type"
                type="text"
                name="program_type"
                value={form.program_type}
                onChange={handleChange}
                placeholder="Program Type"
                className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none"
              />
              {errors.program_type && <p className="text-sm text-red-500 mt-1">{errors.program_type}</p>}

              <div className="md:col-span-2 flex items-center space-x-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === 'male'}
                    onChange={handleChange}
                    className="accent-teal-600"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === 'female'}
                    onChange={handleChange}
                    className="accent-teal-600"
                  />
                  <span>Female</span>
                </label>
                {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="accent-teal-600"
                  />
                  <span>
                    I agree to the <span className="text-teal-600 underline">Terms and Conditions</span>
                  </span>
                </label>
                {errors.agree && <p className="text-sm text-red-500 mt-1">{errors.agree}</p>}
              </div>

              <div className="md:col-span-2 flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
                <button
                  type="button"
                  onClick={() => router.push('/studentlogin')}
                  className="text-teal-600 underline"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          </div>

          <div className="relative rounded-3xl overflow-visible shadow-lg">
            <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[var(--brand-color)] rounded-bl-3xl rounded-tl-3xl z-10"></div>
            <img
              src="/assets/comp.png"
              alt="Free Consultation"
              className="w-full rounded-[24px] md:block sm:hidden hidden object-cover relative z-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
