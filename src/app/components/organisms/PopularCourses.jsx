'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import CourseCard from '../molecules/CourseCard';
import Button from '../atoms/Button';
import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import courses from '../../utils/courses';
import Link from 'next/link';

const PopularCourses = () => {
  return (
    <section className="bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          <div className="text-center lg:text-left w-full lg:w-3/4">
            <Heading level={3}>
              Popular <span className="text-[#0B6D76]">Courses</span>
            </Heading>
            <div className="mt-2 max-w-xl mx-auto lg:mx-0">
              <Paragraph>
                Experience excellence in education through popular courses at top-tier universities.
              </Paragraph>
            </div>
          </div>
          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center lg:justify-end w-full lg:w-1/4">
            <button className="course-prev bg-[var(--brand-color)] p-3 lg:p-4 rounded-full shadow-md hover:bg-[#095d65] transition">
              <FaChevronLeft className="text-white" />
            </button>
            <button className="course-next bg-[var(--brand-color)] p-3 lg:p-4 rounded-full shadow-md hover:bg-[#095d65] transition">
              <FaChevronRight className="text-white" />
            </button>
          </div>
        </div>
        {/* Courses Slider */}
        <div className="mb-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.course-prev',
              nextEl: '.course-next',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <CourseCard {...course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        {/* View All Button */}
        <div className="text-center">
          <Link href={"courses"}><Button>View All Courses</Button></Link>
        </div>
      </Container>
    </section>
  );
};

export default PopularCourses;
