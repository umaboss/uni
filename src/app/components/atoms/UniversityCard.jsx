'use client';

import Image from 'next/image';
import Link from 'next/link';
// import { FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
// import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
// import Button from '@/app/components/atoms/Button';
// import Container from '@/app/components/atoms/Container';
import Heading from '../../components/atoms/Heading';
// import Paragraph from '@/app/components/atoms/Paragraph';
// import CourseDetailForm from '@/app/components/organisms/CourseDetailForm';
// import { getUniversityById } from '@/app/utils/universities';
// import { courses } from '@/app/utils/courses';

const UniversityCard = ({ name, image, className = '', style, slug, id }) => {
  const cardContent = (
    <div className={`text-center group cursor-pointer ${className}`} style={style}>
      {/* Image */}
      <div className="w-[240px] h-[240px] mx-auto mb-4 rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <Image 
          src={image} 
          alt={name}
          width={240}
          height={240}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Name */}
      <Heading level={4}>{name}</Heading>
      {/* Optional Paragraph */}
      
    </div>
  );

  // If both id and slug are provided, wrap in Link with the new format
  if (id && slug) {
    return (
      <Link href={`/university/${id}-${slug}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default UniversityCard;
