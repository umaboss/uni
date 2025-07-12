'use client';
import Image from 'next/image';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import Link from 'next/link';

const CourseCard = ({ image, title, university, location, type, discount, id }) => {
  return (
    <Link href={`/courses/${id}`}>
    <div className="relative rounded-tl-[50px] rounded-tr-[40px]  overflow-hidden group  h-full ">
      {/* Image Container */}
      <div className="relative h-[350px] w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Discount badge */}
        <div className="absolute top-0 text-center   w-[70px] h-[73px] border-[9px] border-[white] right-0 bg-[var(--brand-color)] text-white rounded-tl-[60px] rounded-tr-[60px] 
        rounded-br-[60px] py-2  text-[13px] z-20">
          {discount}
          % <br /> OFF
        </div>
      </div>

      {/* Overlayed content */}
      <div className='flex justify-end items-end xl:mr-[6%] lg:mr-[10%] md:mr-[10%] sm:mr-[20%] mr-[10%]'>
        <div className="relative z-30 -mt-16 xl:w-[95%] lg:w-[80%] md:w-[95%] sm:w-[95%] w-[95%]  bg-[#E7F1F2] text-center rounded-tl-[90px] rounded-tr-[90px] rounded-br-[90px] text-white py-6 px-10 rounded-lg shadow-lg">
          <Paragraph>{university}</Paragraph>
          <Heading level={4}>{title}</Heading>
          <Heading level={2}>{location}</Heading>
          <span className="inline-block bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
            {type}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default CourseCard;
