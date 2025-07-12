'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Heading from '../atoms/Heading';
import Button from '../atoms/Button';
import Paragraph from '../atoms/Paragraph';
import Container from '../atoms/Container';
import UniversityCountrySection from '../molecules/UniversityCountrySection';
import UniversityCoursesSection from '../molecules/UniversityCoursesSection';

const countries = [
  {
    name: 'China (CN)',
    flag: '/assets/china.png',
    discounted: '150000 PKR',
    actual: '250000 PKR',
    discount: '40% OFF',
  },
  {
    name: 'Germany (DE)',
    flag: '/assets/ger.png',
    discounted: '135000 PKR',
    actual: '150000 PKR',
    discount: '10% OFF',
  },
  {
    name: 'Malaysia (ML)',
    flag: '/assets/mali.png',
    discounted: '45000 PKR',
    actual: '50000 PKR',
    discount: '10% OFF',
  },
  {
    name: 'United Kingdom (GB)',
    flag: '/assets/uni.png',
    discounted: '9000 PKR',
    actual: '30000 PKR',
    discount: '70% OFF',
  },
];

const coursesData = {
  'Accounting, Finance': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Business, Management': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Computer Science & Technology': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Education, Teaching': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Engineering': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Hotel Management': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Industrial Design': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Actuarial Studies': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Agriculture': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Architecture': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Arts': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
  'Aviation': [
    'Finance (Fudan University)',
    'Master of Finance (Fudan University)',
    'Finance (Tsinghua University)',
    'Finance Engineering (Wuhan University)',
    'Accounting (Wuhan University)',
  ],
};

const UniversitiesPage = () => {
  const courseKeys = Object.keys(coursesData);
  const [activeCourse, setActiveCourse] = useState(courseKeys[0]);

  const toggleCourse = (course) => {
    setActiveCourse((prev) => (prev === course ? null : course));
  };
  return (
    <div>
      {/* Hero Section */}
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] flex items-end justify-center overflow-hidden pt-[80px]">
        <img
          src="/assets/se.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-center object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]" />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pb-12">
          <Heading level={1}>
            <div className="text-white ">Find Top Ranked Universities and Colleges</div>
          </Heading>
          <Paragraph>
            <p className="text-white w-[65%] mx-auto leading-relaxed">
              Discover global opportunities and expand your horizons with world-class education
            </p>
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
            <Button
              size="lg"
              className=""
            >
              Search Now
            </Button>
          </div>
        </div>
      </section>
      {/* Country Section */}
      <Container>
        <section className="complete-page-spaceing banner-bottom-space bottom-session-space">
          <UniversityCountrySection />
          {/* Courses Section */}
          <UniversityCoursesSection />
        </section>
      </Container>
    </div>
  );
};

export default UniversitiesPage;
