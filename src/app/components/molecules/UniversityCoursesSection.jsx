'use client';

import { useState } from 'react';
import { coursesData } from '../../utils/univeristypage';
import Heading from '../atoms/Heading';
import Link from 'next/link';
import Button from '../atoms/Button';

const UniversityCoursesSection = () => {
  const courseKeys = Object.keys(coursesData);
  const [activeCourse, setActiveCourse] = useState(courseKeys[0]); // default: first accordion open

  const toggleCourse = (course) => {
    setActiveCourse((prev) => (prev === course ? null : course));
  };

  return (
    <section>
      <div className="text-center mb-8 ">
        <Heading level={3}>
          Search <span className="text-[#0B6D76]">By Courses</span>
        </Heading>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] h-full overflow-hidden items-start">
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-[30px]">
          {courseKeys
            .filter((_, i) => i % 2 === 0)
            .map((category, index) => (
              <Accordion
                key={index}
                category={category}
                courses={coursesData[category]}
                isOpen={activeCourse === category}
                toggle={toggleCourse}
              />
            ))}
        </div>
        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-[30px]">
          {courseKeys
            .filter((_, i) => i % 2 !== 0)
            .map((category, index) => (
              <Accordion
                key={index}
                category={category}
                courses={coursesData[category]}
                isOpen={activeCourse === category}
                toggle={toggleCourse}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

const Accordion = ({ category, courses, isOpen, toggle }) => {
  return (
    <div className="border border-[#0B6D76] rounded-xl overflow-hidden">
      <button
        onClick={() => toggle(category)}
        className={`w-full flex justify-between items-center px-6 py-4 font-medium transition duration-200 text-left text-lg ${isOpen ? 'bg-[var(--brand-color)] text-white' : 'bg-[var(--brand-color)] text-white'
          }`}
      >
        <span>{category}</span>
        <span className="bg-white w-[31px] h-[31px] rounded-full flex justify-center items-center text-[#0B6D76]">
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="bg-white px-6 pb-6 pt-2 text-sm text-gray-800">
          <ul className="gap-[10px] flex flex-col">
            {courses.map((course, i) => (
              <li className="border-b border-[#B1B1B1] text-[#0B6D76]" key={i}>
                <Link
                  href="/search"
                  target="_blank"
                  className="flex py-[20px] justify-between items-center"
                >
                  {course} <span className="ml-1">↗</span>
                </Link>
              </li>
            ))}
          </ul>

          {courses.length > 0 && (
            <div className="mt-4">
              <Link href={'/search'} target="_blank">
                <Button>View All</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UniversityCoursesSection;
