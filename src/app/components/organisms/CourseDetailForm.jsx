'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { courses } from '../../utils/courses';
import Button from '../atoms/Button';
import Container from '../atoms/Container';

const CourseDetailForm = () => {
  const params = useParams();
  const { slug } = params;
  const id = Number(slug);

  const course = courses.find((c) => c.id === id);

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
    <div className="bg-[#E7F1F2] p-6 md:p-10 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] border-none-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Qualification</label>
          <input value={course.type || 'N/A'} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Subject</label>
          <input value={course.title || 'N/A'} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input value={course.duration || 'N/A'} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Intakes</label>
          <input value="September / January" readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Languages</label>
          <input value="English" readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Tuition Fee</label>
          <input value={course.tuition?.international || 'N/A'} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Actual Fee</label>
          <input value={course.tuition?.local || 'N/A'} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Discount</label>
          <input value={`${course.discount}%`} readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Consultation After Discount</label>
          <input value="Available on request" readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Scholarship</label>
          <input value="Available for top students" readOnly className="w-full p-2 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-white" />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button>Entry Requirements</Button>
      </div>
    </div>
  );
};

export default CourseDetailForm;
