'use client';

import { useState } from 'react';
import { Bell, User, FileText, Heart, Lock, Menu } from 'lucide-react';
import { useAuth } from '@/app/context/authContext';

import StudentDashboardHome from '../organisms/StudentDashboardHome';
import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import StudentProfile from '../organisms/StudentProfile';
import StudentApplication from '../organisms/StudentApplication';
import StudentWishlist from '../organisms/StudentWishlist';
import StudentPassword from '../organisms/StudentPassword';
import StudentNotifications from '../organisms/StudentNotifications';

const NewDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const { user } = useAuth();
  const student = user?.student || {};

  const renderComponent = () => {
    switch (activeTab) {
      case 'Dashboard': return <StudentDashboardHome />;
      case 'Profile': return <StudentProfile />;
      case 'Application': return <StudentApplication />;
      case 'Wishlist': return <StudentWishlist />;
      case 'Password': return <StudentPassword />;
      case 'Notifications': return <StudentNotifications />;
      default: return <StudentDashboardHome />;
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Menu size={20} /> },
    { name: 'Profile', icon: <User size={20} /> },
    { name: 'Application', icon: <FileText size={20} /> },
    { name: 'Wishlist', icon: <Heart size={20} /> },
    { name: 'Password', icon: <Lock size={20} /> },
    { name: 'Notifications', icon: <Bell size={20} /> },
  ];

  // Helper to show value or fallback
  const show = (val) => val && val !== '' ? val : '—';

  return (
    <Container>
      <div className="">
        <div className="flex gap-[30px]  flex-col lg:flex-row min-h-screen pb-[50px] lg:pt-[50px] pt-[80px]  bg-white p-6">
          <div className="w-80 bg-[#E7F1F2] rounded-3xl p-4 space-y-4">
            {menuItems.map((item) => (
              <div
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`flex items-center space-x-3 px-4 py-3 cursor-pointer rounded-xl
              ${activeTab === item.name ? 'bg-[#0B6D76] text-white' : 'hover:bg-gray-200'}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className=" bg-[#E7F1F2] w-full rounded-3xl p-8 space-y-8">
            {renderComponent()}
          </div>
        </div>

        <Container>
          {activeTab === 'Dashboard' && (
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-center mt-[30px] mb-[20px]">
                <Heading level={3}><span className="mb-4">Additional Form</span></Heading>
              </div>

              <form className="gap-[30px] grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block font-medium">Name</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.first_name)} {show(student.last_name)}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Email</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.email)}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Phone Number</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.phone)}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Nationality</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.nationality)}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Gender</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.gender)}
                  </div>
                </div>
                <div>
                  <label className="block font-medium">Program Type</label>
                  <div className="w-full pl-5 pr-4 py-4 bg-[#E7F1F2] rounded-[30px] text-sm">
                    {show(student.program_type)}
                  </div>
                </div>
              </form>


              <div className="bg-[var(--brand-color)] my-[30px] text-white rounded-[30px] px-5 py-2 font-medium text-sm text-center">
                Entry Requirements
              </div>
              <div className="text-center">
                <Paragraph>Program You Prefer: {show(student.program_type)}</Paragraph>
              </div>
            </div>
          )}
        </Container>
      </div>
    </Container>
  );
};

export default NewDashboard;
