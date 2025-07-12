'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import Logo from '../atoms/Logo';
import Button from '../atoms/Button';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Guides', href: '/CountriesGuide' },
  { name: 'Universities', href: '/institutions' },
  { name: 'Articles', href: '/blog' },
  { name: 'Courses', href: '/courses' },
  { name: 'Visit visa', href: '/visit-visa' },
  { name: 'Free Consultation', href: '/free-consultation' },
  { name: 'Track Application', href: '/track-application' },
  { name: 'Discount Offer', href: '/discount-offer' },
  { name: 'Search', href: '/search' },
  { name: 'Apply Online', href: '/apply-online' },
  { name: 'Complaint', href: '/complaint' },
  { name: 'Contact Us', href: '/contact-us' },
  { name: 'Job-Opportunities', href: '/jobs' },
  { name: 'Minhaj-University', href: '/minhaj-university-lahore' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const studentName = user?.student?.first_name || 'Student';

  const handleLogout = () => {
    logout();
    router.push('/');
    setShowMenu(false);
    setIsOpen(false);
  };

  const handleDashboard = () => {
    router.push('/dashboard');
    setShowMenu(false);
    setIsOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  return (
    <header className="relative z-50">
      {/* Desktop Header */}
      <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm border-b border-gray-100">
            {/* Left Links */}
            <div className="flex items-center gap-[30px]">
              {!user?.student ? (
                <>
                  <Link href="/students" passHref>
                    <span className="text-sm cursor-pointer hover:text-blue-600">Student</span>
                  </Link>
                  <Link href="/consultants" passHref>
                    <span className="text-sm cursor-pointer hover:text-blue-600">Consultant</span>
                  </Link>
                  <Link href="/social" passHref>
                    <span className="text-sm cursor-pointer hover:text-blue-600">Social</span>
                  </Link>
                </>
              ) : (
                <div className="relative">
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-white hover:shadow-sm transition duration-200 border border-gray-200"
                >
                  <FaUserCircle size={24} className="text-[#0B6D76]" />
                  <span className="text-sm font-medium text-gray-800">{studentName}</span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${showMenu ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              
                {showMenu && (
                  <div className="absolute -right-20 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fade-in-down">
                    <div className="px-4 py-4 bg-[#F1FAFA] text-sm font-semibold text-[#0B6D76] border-b border-gray-200">
                      👋 Welcome, {studentName}
                    </div>
              
                    <button
                      onClick={handleDashboard}
                      className="flex items-center cursor-pointer gap-2 w-full px-4 py-3.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <span>📋</span> Dashboard
                    </button>
              
                    <button
                      onClick={handleLogout}
                      className="flex items-center cursor-pointer gap-2 w-full px-4 py-3.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
              
              )}
            </div>

            {/* Logo */}
            <Logo />

            {/* Right Side */}
            <div className="flex items-center gap-[30px]">
              <img src="/assets/logor.png" alt="user" className="" />
              <Link href="/contact-us">
                <Button className="text-xs md:text-sm">Contact Us</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div className="bg-[var(--brand-color)]/60 text-white py-4 backdrop-blur-lg">
          <div className="flex justify-center space-x-4 xl:space-x-8">
            {navItems.map(({ name, href }) => (
              <Link key={name} href={href} className="text-sm hover:text-teal-300 transition-colors relative group">
                {name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`lg:hidden fixed top-0 left-0 right-0 px-4 py-2 flex justify-between items-center z-50 ${isOpen ? 'bg-[var(--brand-color)] text-white' : 'bg-white text-black border-b border-gray-200 shadow-sm'}`}>
        <Link href="/">
          <img src="/assets/logo1.png" alt="Mobile Logo" className="h-[40px] w-[40px]" />
        </Link>
        <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <HiX size={26} /> : <HiMenu size={26} />}</button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed top-[48px] left-0 w-full h-[calc(100vh-48px)] bg-[var(--brand-color)] text-white z-40 p-4 overflow-y-auto">
          <div className="grid grid-cols-4 mb-6 bg-[#0B6D76] rounded-lg p-2 text-center">
            {!user?.student ? (
              <>
                <Link href="/students" onClick={() => setIsOpen(false)} className="col-span-4 text-sm py-2 hover:bg-white/10">Student</Link>
                <Link href="/consultants" onClick={() => setIsOpen(false)} className="col-span-4 text-sm py-2 hover:bg-white/10">Consultant</Link>
                <Link href="/social" onClick={() => setIsOpen(false)} className="col-span-4 text-sm py-2 hover:bg-white/10">Social</Link>
              </>
            ) : (
              <div className="col-span-4 flex justify-center">
                <div className="relative flex justify-center w-full">
                  <div onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-1 cursor-pointer justify-center w-full">
                    <FaUserCircle size={18} className="text-white" />
                    <span className="text-xs font-medium">{studentName}</span>
                  </div>
                  {showMenu && (
                    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-36 bg-white border rounded shadow-md z-50 text-black">
                      <div className="px-4 py-2 font-medium border-b text-gray-700">👋 {studentName}</div>
                      <button onClick={handleDashboard} className="block px-4 py-2 w-full text-left hover:bg-gray-100">Dashboard</button>
                      <button onClick={handleLogout} className="block px-4 py-2 w-full text-left hover:bg-gray-100">Logout</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {navItems.map(({ name, href }) => (
              <Link key={name} href={href} onClick={() => setIsOpen(false)} className="py-3 px-4 text-sm rounded bg-white/10 hover:bg-white text-white hover:text-[var(--brand-color)] block text-center font-medium">
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
