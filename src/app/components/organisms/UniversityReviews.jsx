'use client';

import { FaStar } from "react-icons/fa";
import Heading from '@/app/components/atoms/Heading';
import { BsFillPersonFill } from "react-icons/bs";

const UniversityReviews = () => {
 const review = {
  name: "John Doe",
  message:
    "I am very excited to built my career with the university of Milan",
};
  return (
   <div className="bg-[#E7F1F2] p-[30px] text-cneter rounded-lg shadow-md relative flex flex-col justify-between py-[10px] w-full  ">
   <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[120px] bg-[#0B6D76] rounded-r-md"></span>

   <div>
     <div className="text-teal-500 text-center mb-2">★★★★★</div>
     <Heading level={3}>
       <div className="text-center mx-auto max-w-[75%] pr-1">{review.message}</div>
     </Heading>
   </div>

   <div className=" gap-[20px]  mt-4">
     <p className="font-semibold text-teal-700 text-center">{review.name}</p>
   </div>
 </div>
  );
};

export default UniversityReviews; 