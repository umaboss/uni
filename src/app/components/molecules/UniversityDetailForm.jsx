'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Button from '../atoms/Button';
import Container from '../atoms/Container';
import { getUniversityById } from '@/app/utils/universities';

const UniversityDetailForm = () => {
  const params = useParams();
  const { slug } = params;

  // Correctly extract the id from slug (e.g. "2-university-of-pisa" -> 2)
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

  return (
    <div className="bg-[#E7F1F2] p-6 md:p-10 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium">Accommodation</label>
          <input
            value="Available on Campus"
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Intakes</label>
          <input
            value="September / January"
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Languages</label>
          <input
            value="English"
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Scholarship</label>
          <input
            value="Available for top students"
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Discount</label>
          <input
            value="10% - 35%"
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Discounted Price</label>
          <input
            value={
              university?.tuition?.international
                ? university.tuition.international
                : 'N/A'
            }
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Original Price</label>
          <input
            value={
              university?.tuition?.eu || university?.tuition?.local || 'N/A'
            }
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            value={university.location}
            readOnly
            className="w-full p-2 rounded-lg bg-white"
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Button>Entry Requirements</Button>
      </div>
    </div>
  );
};

export default UniversityDetailForm;
