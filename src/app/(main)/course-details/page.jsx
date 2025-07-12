'use client';

import { useSearchParams } from 'next/navigation';
import Container from '../components/atoms/Container';
import courses from '../utils/courses';
import Image from 'next/image';
import Button from '../components/atoms/Button';
import Link from 'next/link';
import Heading from '../components/atoms/Heading';
import Paragraph from '../components/atoms/Paragraph';
import CourseDetailForm from '../components/organisms/CourseDetailForm';
const CourseDetails = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  // Find the course from our courses data
  const course = courses.find(c => c.title === title);

  if (!course) {
    return (
      <Container>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link href="/"><Button>Go Back Home</Button></Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] flex items-end justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src="/assets/detail.png"
        alt="Hero Background"
        className="absolute top-0 left-0 w-full h-full object-center bg-cover object-top z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]"></div>
      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto pb-12">
        <Heading level={1}>
          <div className="text-white">MBBS Program (In English)
          Bachelor</div>
        </Heading>
      
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeIn_1s_ease-in_0.4s] mt-6">
         <Link href={"/universities"}>
         <Button
            size="lg"
            className=" text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl"
          >
            Admission Request
          </Button>
         </Link>
         <Link href={"/universities"}>
         <Button
            size="lg"
            className=" text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl"
          >
           Free Consultation
          </Button>
         </Link>
        </div>
      </div>
    </section>
    <CourseDetailForm/>
      <Container>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-[400px] w-full">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{course.title}</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Course Details</h2>
                <div className="space-y-3">
                  <p className="text-gray-600"><span className="font-medium">University:</span> {course.university}</p>
                  <p className="text-gray-600"><span className="font-medium">Location:</span> {course.location}</p>
                  <p className="text-gray-600"><span className="font-medium">Type:</span> {course.type}</p>
                  {course.duration && (
                    <p className="text-gray-600"><span className="font-medium">Duration:</span> {course.duration}</p>
                  )}
                  {course.discount && (
                    <p className="text-green-600 font-semibold">Discount: {course.discount}% OFF</p>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-700 mb-4">Apply Now</h2>
                <p className="text-gray-600 mb-6">
                  Ready to start your journey? Apply now for this course and take the first step towards your future.
                </p>
                <Link href="/apply-online">
                  <Button>Apply for this Course</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CourseDetails; 