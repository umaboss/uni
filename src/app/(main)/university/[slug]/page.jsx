'use client';

import Link from 'next/link';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaCamera, FaGraduationCap, FaStar } from "react-icons/fa";
import Button from '@/app/components/atoms/Button';
import Container from '@/app/components/atoms/Container';
import Heading from '@/app/components/atoms/Heading';
import Paragraph from '@/app/components/atoms/Paragraph';
import CourseCard from '@/app/components/molecules/CourseCard';
import UniversityOverview from '@/app/components/organisms/UniversityOverview';
import UniversityPhotos from '@/app/components/organisms/UniversityPhotos';
import UniversityCourses from '@/app/components/organisms/UniversityCourses';
import UniversityReviews from '@/app/components/organisms/UniversityReviews';
import { getUniversityById, universities } from '@/app/utils/universities';
import { courses } from '@/app/utils/courses';
import { useParams } from 'next/navigation';
import { useState } from 'react';

const UniversityDetails = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const params = useParams();
  const { slug } = params;
  const id = Number(slug.split('-')[0]);

  const university = getUniversityById(id);

  if (!university) {
    return (
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">University not found</h1>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Get related data
  const relatedCourses = courses
    .filter(course => course.university.trim().toLowerCase() === university.name.trim().toLowerCase());

  const relatedUniversities = universities
    .filter(u => u.id !== university.id)
    .slice(0, 3); // Show max 3 other universities

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <IoMdCheckmarkCircleOutline /> },
    { id: 'photos', label: 'Photos', icon: <FaCamera /> },
    { id: 'courses', label: 'Courses', icon: <FaGraduationCap /> },
    { id: 'reviews', label: 'Reviews', icon: <FaStar /> }
  ];

  // Render content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <UniversityOverview university={university} relatedUniversities={relatedUniversities} />;
      case 'photos':
        return <UniversityPhotos university={university} />;
      case 'courses':
        return <UniversityCourses university={university} relatedCourses={relatedCourses} />;
      case 'reviews':
        return <UniversityReviews />;
      default:
        return <UniversityOverview university={university} relatedUniversities={relatedUniversities} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] h-[84vh] flex items-end justify-center overflow-hidden">
        <img
          src="/assets/detail.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover object-top z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]"></div>
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto pb-12">
          <Heading level={1}>
            <div className="text-white">{university.name}</div>
          </Heading>
          <Paragraph>
            <p className="text-white text-lg mt-4">{university.location}</p>
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Link href="/apply-online">
              <Button size="lg" className="text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                Apply Now
              </Button>
            </Link>
            <Link href="/free-consultation">
              <Button size="lg" className="text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Container>
        <div className="complete-page-spaceing banner-bottom-space bottom-session-space">
          {/* Available Courses Section */}
          <div className="">
            <div className="text-center mb-6">
              <Heading level={3}>Available Courses</Heading>
            </div>
            {relatedCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {relatedCourses.map(course => (
                  <CourseCard key={course.id} {...course} />
                ))}
              </div>
            ) : (
              <Paragraph className="text-center text-lg text-gray-500">
                No courses available for this university.
              </Paragraph>
            )}
          </div>

          {/* Tabbed Interface */}
          <div className="">
            {/* Tab Buttons */}
            <div className="grid md:w-[70%] sm:w-[100%] w-[100%] grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4  mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-[100%] h-32 flex flex-col items-center justify-center rounded-lg relative transition-all duration-300 p-4 ${
                    activeTab === tab.id 
                      ? 'bg-[#0B6D76] text-white shadow-lg' 
                      : 'bg-[#f0fafa] text-[#0B6D76] hover:bg-[#e0f5f5]'
                  }`}
                >
                  <div className="text-2xl mb-2">{tab.icon}</div>
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-2 w-4 h-4 bg-[#0B6D76] rotate-45"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">
              {renderContent()}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UniversityDetails;
