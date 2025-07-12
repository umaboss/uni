'use client';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import PopularCourses from '@/app/components/organisms/PopularCourses';
import CourseCard from '@/app/components/molecules/CourseCard';
import Button from '@/app/components/atoms/Button';
import Container from '@/app/components/atoms/Container';
import Heading from '@/app/components/atoms/Heading';
import CourseDetailForm from '@/app/components/organisms/CourseDetailForm';
import courses from '@/app/utils/courses';

const CourseDetails = () => {
  const params = useParams();
  const { slug } = params;
  const id = Number(slug);

  // Find the course from our courses data by id
  const course = courses.find(c => c.id === id);

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
            <div className="text-white">{course.title}</div>
          </Heading>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeIn_1s_ease-in_0.4s] mt-6">
            <Link href={"/universities"}>
              <Button size="lg" className=" text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                Admission Request
              </Button>
            </Link>
            <Link href={"/universities"}>
              <Button size="lg" className=" text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
  <Container>
 
 <div className="complete-page banner-bottom-space bottom-session-space complete-page-spaceing">
 <div className="main-session flex justify-between items-center gap-6 flex-wrap md:flex-nowrap">
      {/* LEFT SIDE */}
      <div className="image-session bg-[#E7F1F2] w-full md:w-[45%] p-6 rounded-lg relative shadow-md">
        {/* DISCOUNT TAG */}
        <div className="absolute top-3 right-3 bg-teal-700 text-white text-sm font-semibold px-3 py-1 rounded-full">
          40% OFF
        </div>

        {/* LOGO + TEXT */}
        <div className="box-session flex items-center gap-6 mb-6">
          <div className="img ">
            <img src="/assets/dtb1.png" alt="university logo" className="" />
          </div>
          <div className="text">
            <Heading level={5}>{course.university}</Heading>
            <Heading level={6} className="text-gray-600">{course.location}</Heading>
            <div className="icon flex gap-4 mt-2">
              <a href="#" aria-label="Facebook">
                <div className="bg-teal-700 w-10 h-10 rounded-full flex justify-center items-center text-white text-lg">
                  <FaFacebook />
                </div>
              </a>
              <a href="#" aria-label="Twitter">
                <div className="bg-teal-700 w-10 h-10 rounded-full flex justify-center items-center text-white text-lg">
                  <FaTwitter />
                </div>
              </a>
              <a href="#" aria-label="Whatsapp">
                <div className="bg-teal-700 w-10 h-10 rounded-full flex justify-center items-center text-white text-lg">
                  <FaWhatsapp />
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* APPLY BUTTON */}
        <div className="w-full">
          <Button>Apply</Button>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
        <div className="">
          <img src="/assets/visit.png" alt="campus" className="w-full h-full object-cover" />
        </div>
    </div>
     <div className="">
       <CourseDetailForm/>
     </div>
      <div className="title-side flex flex-col md:flex-row gap-16 mt-12">
      
      {/* Left Side Stats */}
      <div className="xl:w-[40%] lg:w-[40%] md:w-[50%] sm:w-[100%] w-full">
        <div className="grid grid-cols-2 gap-6">
          {/* 1st Item */}
          <div className="bg-gray-100 flex flex-col justify-center items-center gap-4 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-xs">
              <IoMdCheckmarkCircleOutline />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-800">1000+</div>
              <div className="text-xs text-gray-600">Students</div>
            </div>
          </div>

          {/* 2nd Item */}
          <div className="bg-gray-100 flex flex-col justify-center items-center gap-4 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-xs">
              <IoMdCheckmarkCircleOutline />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-800">90%</div>
              <div className="text-xs text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* 3rd Item */}
          <div className="bg-gray-100 flex flex-col justify-center items-center gap-4 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-xs">
              <IoMdCheckmarkCircleOutline />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-800">50+</div>
              <div className="text-xs text-gray-600">Courses</div>
            </div>
          </div>

          {/* 4th Item */}
          <div className="bg-gray-100 flex flex-col justify-center items-center gap-4 rounded-lg p-4 text-center">
            <div className="w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-xs">
              <IoMdCheckmarkCircleOutline />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold text-gray-800">20</div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Text */}
      <div className="flex-1">
        <div className="max-w-[400px]"><Heading level={3} className="mb-4">{course.title}</Heading></div>
        <div className="py-4"><Heading level={6} className="text-gray-700 mb-2">Green listed University</Heading></div>
        <div className="max-w-[420px]">
        <Heading level={6} className="text-gray-700 mb-4">
          {course.description}
        </Heading>
        </div>
        <div className="require pt-[20px]">
          <Heading level={4} className="mb-2">Required Documents:</Heading>
          <Heading level={6} className="text-gray-700">1: {course.requirements}</Heading>
          <Heading level={6} className="text-gray-700">2. Last Education Result Cards</Heading>
        </div>
      </div>
    </div>


    <div className="">
     <div className=" text-center pb-[20px]"><Heading level={3}>Other Related Courses</Heading></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4 py-8">
      {courses.slice(0, 2).map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          image={course.image}
          title={course.title}
          university={course.university}
          location={course.location}
          type={course.type}
          discount={course.discount}
        />
      ))}
    </div>
      <div className="flex justify-center"><Button>view More Courses</Button></div>
    </div> 




 </div>


{/* 
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
        </div> */}
  </Container>
    </div>
  );
};

export default CourseDetails; 