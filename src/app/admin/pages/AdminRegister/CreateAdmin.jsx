"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, EyeOff } from "lucide-react";

const CreateAdmin = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const newAdmin = {
      id: Date.now(),
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      role: "Admin",
      department: "",
      status: "Active",
      lastLogin: "-",
      createdAt: new Date().toISOString().split("T")[0]
    };

    const stored = localStorage.getItem("admins");
    const admins = stored ? JSON.parse(stored) : [];
    admins.push(newAdmin);
    localStorage.setItem("admins", JSON.stringify(admins));

    alert("Admin Created Successfully.");
    setTimeout(() => router.push("/admin-register/list"), 1000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Link
            href="/admin-register/list"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Admin Account</h1>
            <p className="text-gray-600">Add a new administrator to the system</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="submit"
              className="bg-[#0B6D76] text-white px-8 py-3 rounded-xl flex items-center space-x-2 hover:shadow-xl"
            >
              <Save className="w-5 h-5" />
              <span>Create Admin</span>
            </button>
            <Link
              href="/admin-register/list"
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-xl"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
