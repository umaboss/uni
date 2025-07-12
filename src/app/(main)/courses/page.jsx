'use client';

import Button from '../../components/atoms/Button';
import Container from '../../components/atoms/Container';
import Heading from '../../components/atoms/Heading';
import CoursePageType from '../../components/organisms/CoursePageType';
import CoursesPageSubject from '../../components/organisms/CoursesPageSubject';
import { courseTypes, subjects } from '../../utils/coursesPages'; // ← Imported data
import Paragraph from '../../components/atoms/Paragraph';
const CoursesPage = () => {
  return (
    <div className="">
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] flex items-end justify-center overflow-hidden">

        {/* Background Image */}
        <img
          src="/assets/c.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover  object-top z-0"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]"></div>
        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pb-12">
          <Heading level={1}>
            <div className="text-white">Find Courses</div>
          </Heading>
          <Paragraph>
            <p className="text-white w-[65%] mx-auto leading-relaxed">
              Here you can search over 10,000 courses by course type or Subject wise.
            </p>
          </Paragraph>
        </div>
      </section>
      <div className="min-h-screen bg-gray-50 bottom-session-space banner-bottom-space">
        <Container>
          <div className="complete-page-spaceing">
            {/* Courses by Type Section */}
            <div className="">
              <div className="text-center mb-8">
                <p className="text-sm text-gray-500 mb-2">Courses List</p>
                <Heading level={3}>Courses <span className="text-[#0B6D76]">By Type</span></Heading>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[70px] mb-8">
                {courseTypes.map((course, index) => (
                  <CoursePageType
                    key={index}
                    title={course.title}
                    image={course.image}
                    onClick={() => console.log(`Clicked ${course.title}`)}
                  />
                ))}
              </div>
              <div className="text-center mt-[70px]">
                <Button>
                  See All
                </Button>
              </div>
            </div>
            {/* Courses by Subject Section */}
            <div>
              <div className="text-center mb-8">
                <p className="text-sm text-gray-500 mb-2">Courses List</p>
                <Heading level={3}>Courses <span className="text-[#0B6D76]">By Subject</span></Heading>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {subjects.map((subject, index) => (
                  <CoursesPageSubject
                    key={index}
                    title={subject.title}
                    image={subject.image}
                    onClick={() => console.log(`Clicked ${subject.title}`)}
                  />
                ))}
              </div>
              <div className="text-center">
                <Button>
                  See All
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default CoursesPage;
