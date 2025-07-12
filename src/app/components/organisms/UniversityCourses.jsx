'use client';

import React, { useState } from 'react';
import { FaGraduationCap } from "react-icons/fa";
import Heading from '@/app/components/atoms/Heading';
import Paragraph from '@/app/components/atoms/Paragraph';
import CourseCard from '@/app/components/molecules/CourseCard';
import { courseTypes, subjects } from '@/app/utils/coursesPages';
import qualificationsPages from '@/app/utils/qualifications';
import Button from '../atoms/Button';
import { courses as allCourses } from '@/app/utils/courses';

const flatQualifications = qualificationsPages.flat().map(q => q.title);

const UniversityCourses = ({ university, relatedCourses }) => {
  // Filtering state
  const [search, setSearch] = useState('');
  const [qualification, setQualification] = useState('');
  const [subject, setSubject] = useState('');
  const [filtered, setFiltered] = useState(relatedCourses);
  const [filteredOther, setFilteredOther] = useState([]);

  // Filtering logic
  const handleFilter = (e) => {
    e.preventDefault();
    let filteredCourses = relatedCourses;
    let filteredOtherCourses = allCourses.filter(c => c.university.trim().toLowerCase() !== university.name.trim().toLowerCase());
    if (search.trim()) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(search.trim().toLowerCase())
      );
      filteredOtherCourses = filteredOtherCourses.filter(course =>
        course.title.toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    if (qualification) {
      filteredCourses = filteredCourses.filter(course =>
        course.type && course.type.toLowerCase() === qualification.toLowerCase()
      );
      filteredOtherCourses = filteredOtherCourses.filter(course =>
        course.type && course.type.toLowerCase() === qualification.toLowerCase()
      );
    }
    if (subject) {
      filteredCourses = filteredCourses.filter(course =>
        course.title.toLowerCase().includes(subject.toLowerCase())
      );
      filteredOtherCourses = filteredOtherCourses.filter(course =>
        course.title.toLowerCase().includes(subject.toLowerCase())
      );
    }
    setFiltered(filteredCourses);
    setFilteredOther(filteredOtherCourses);
  };

  // Reset filter when relatedCourses or university changes
  React.useEffect(() => {
    setFiltered(relatedCourses);
    setFilteredOther(allCourses.filter(c => c.university.trim().toLowerCase() !== university.name.trim().toLowerCase()));
  }, [relatedCourses, university]);

  return (
    <div className="space-y-6">
      {/* Filter UI */}
      <div className="text-center mt-12"><Heading level={3}>Filter course</Heading></div>
      <form onSubmit={handleFilter} className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <Button>
          <input
            type="text"
            placeholder="Search course name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className=" w-full outline-none py-[4px]"
          />
        </Button>
        <Button>
          <select
            value={qualification}
            onChange={e => setQualification(e.target.value)}
            className="w-full outline-none py-[4px]"
          >
            <option value="">All Qualifications</option>
            {flatQualifications.map(q => (
              <option className='text-black' key={q} value={q}>{q}</option>
            ))}
          </select>
        </Button>
        <Button>
          <select
            value={subject}
            onChange={e => setSubject(e.target.value)}
            className="w-full outline-none py-[4px]"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option className='text-black' key={s.title} value={s.title}>{s.title}</option>
            ))}
          </select>
        </Button>
        <Button>
          <div type="submit" className="">
            Search
          </div>
        </Button>
      </form>
      {/* Other Courses */}
      <div className="">
        {filteredOther.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredOther.map(course => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaGraduationCap className="text-6xl text-gray-300 mx-auto mb-4" />
            <Paragraph className="text-lg text-gray-500">No other courses found.</Paragraph>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityCourses; 