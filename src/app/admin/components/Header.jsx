"use client"; // Required if using client-side interactivity in Next.js App Router

import { useState } from "react";
import { Bell, Search, User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(null); // 'notifications' | 'profile'

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold bg-[#0B6D76] bg-clip-text text-transparent">
            University Admin Dashboard
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("notifications")}
              className="p-3 rounded-xl hover:bg-gray-100 relative transition-colors duration-200"
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-[#0B6D76] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {openMenu === "notifications" && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-6 bg-[#0B6D76] text-white">
                  <h3 className="font-bold text-lg">Notifications</h3>
                  <p className="text-indigo-100 text-sm">You have 3 new notifications</p>
                </div>
                <div className="p-4 space-y-4">
                  {/* Notification Items */}
                  {[
                    {
                      color: "bg-blue-500",
                      message: "New student enrollment request",
                      time: "2 minutes ago",
                    },
                    {
                      color: "bg-green-500",
                      message: "Monthly report generated",
                      time: "1 hour ago",
                    },
                    {
                      color: "bg-orange-500",
                      message: "Faculty meeting reminder",
                      time: "3 hours ago",
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                      <div className={`w-3 h-3 ${item.color} rounded-full mt-2 flex-shrink-0`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{item.message}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-100">
                  <button className="w-full text-center text-[#0B6D76] hover:text-indigo-700 font-medium text-sm">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => toggleMenu("profile")}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-10 h-10 bg-[#0B6D76] rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-sm font-semibold text-gray-700 block">Admin User</span>
                <span className="text-xs text-gray-500">Administrator</span>
              </div>
            </button>

            {/* Profile Dropdown */}
            {openMenu === "profile" && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                <div className="p-6 bg-[#0B6D76] text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-semibold">Admin User</p>
                      <p className="text-sm text-indigo-100">admin@university.com</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-150">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 rounded-xl transition-colors duration-150">
                      <Settings className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Settings</span>
                    </button>
                    <div className="border-t border-gray-100 pt-2">
                      <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-50 rounded-xl transition-colors duration-150">
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="text-sm font-medium text-red-600">Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 