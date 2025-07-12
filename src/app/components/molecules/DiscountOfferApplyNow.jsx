
import '../../../app/globals.css';
import Heading from '../atoms/Heading';
import { FaFlag, FaGlobe, FaUser } from 'react-icons/fa';
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { CiPercent } from "react-icons/ci";
import Button from '../atoms/Button';
import { Input, Select } from '@/app/(main)/free-consultation/page';

const DiscountOfferApplyNow = () => {
  return (
    <div className='text-center md:py-12 sm:py-2 py-2'>
      <div className="pb-[50px]">
        <Heading level={3}>
          Fill The Form Below to <span className="text-[#0B6D76] font-medium">  Apply Now</span>
        </Heading>
      </div>
      <div className="discount-sesiom grid md:grid-cols-2 gap-[80px]">
        <div className="grid grid-cols-1 gap-4 w-full">
          <div className="form grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
            <Input icon={<FaUser />} placeholder={"Enter Your Name"} />
            <Input icon={<MdOutlineMail />} placeholder={"Enter Your Email"} />
            <Input icon={<CiPercent />} placeholder={"Enter Your Persentage"} />
            <Input icon={<MdOutlinePhoneEnabled />} placeholder={"Phone"} />
            <Input icon={<HiOutlineAcademicCap />} placeholder={"Last Education"} />
            <Input icon={<FaFlag />} placeholder={"Enter Your City"} />
          </div>
          <div className="col-span-2 flex gap-[20px] flex-col">
            <Select name="state" icon={<FaGlobe />} placeholder="Office Location" options={['Punjab', 'Sindh', 'California']} />
            <textarea
              name="applyFor"
              placeholder="Enter Details"
              className="px-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-[#E7F1F2] text-sm resize-none h-[120px] placeholder-gray-500"
            />
        <div className="">
        <Button>
            Submit Offer
          </Button>
        </div>
          </div>
        </div>
        {/* Image Section */}
        <div className="relative rounded-3xl overflow-visible shadow-lg">
          <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[var(--brand-color)] rounded-bl-3xl rounded-tl-3xl z-10"></div>
          <img
            src="/assets/dsic.png"
            alt="Free Consultation"
            className="w-full h-auto object-cover md:block sm:hidden hidden relative z-0"

          />
        </div>
      </div>
    </div>
  );
};

export default DiscountOfferApplyNow;




