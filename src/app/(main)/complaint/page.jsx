'use client'
import { FaFlag, FaGlobe, FaUser } from 'react-icons/fa';
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { CiPercent } from "react-icons/ci";
import Button from '../../components/atoms/Button';
import Container from '../../components/atoms/Container';
import Heading from '../../components/atoms/Heading';
import Paragraph from '../../components/atoms/Paragraph';
import { Input, Select } from '../free-consultation/page';
import { useState } from 'react';

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    percentage: '',
    phone: '',
    last_education: '',
    city: '',
    state: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('Complaint submitted successfully!');
        setFormData({
          name: '',
          email: '',
          percentage: '',
          phone: '',
          last_education: '',
          city: '',
          state: '',
          details: ''
        });
      } else {
        setMessage('Submission failed!');
      }
    } catch (error) {
      setMessage('Submission failed!');
    }
    setLoading(false);
  };

  return (
    <Container>
      <div className="text-center banner-bottom-space  bottom-session-space">
        {/* Heading */}
        <div className="pb-6 md:pt-[0px] sm:pt-[80px] pt-[80px]">
          <Heading level={3}>
            Complaint / <span className="text-[#0B6D76] font-medium">Suggestion Box</span>
          </Heading>
          <Paragraph>
          If you have any complaint or suggestion please send us message
          </Paragraph>
        </div>

        {/* Main Grid Section */}
        <div className="grid md:grid-cols-2 gap-[80px] items-start">
          {/* Form Section */}
          <form className="grid grid-cols-1 gap-6 w-full" onSubmit={handleSubmit}>
            {/* Input Fields */}
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              <Input icon={<FaUser />} placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange} />
              <Input icon={<MdOutlineMail />} placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleChange} />
              <Input icon={<CiPercent />} placeholder="Enter Your Percentage" name="percentage" value={formData.percentage} onChange={handleChange} />
              <Input icon={<MdOutlinePhoneEnabled />} placeholder="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              <Input icon={<HiOutlineAcademicCap />} placeholder="Last Education" name="last_education" value={formData.last_education} onChange={handleChange} />
              <Input icon={<FaFlag />} placeholder="Enter Your City" name="city" value={formData.city} onChange={handleChange} />
            </div>

            {/* Office Location + Textarea */}
            <div className="flex flex-col gap-4">
              <Select
                name="state"
                icon={<FaGlobe />}
                placeholder="Office Location"
                value={formData.state}
                onChange={handleChange}
                options={['Punjab', 'Sindh', 'California']}
              />

              <textarea
                name="details"
                placeholder="Enter Details"
                value={formData.details}
                onChange={handleChange}
                className="px-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-[#E7F1F2] text-sm resize-none h-[120px] placeholder-gray-500"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Offer'}</Button>
            {message && <div className="text-center text-green-600 font-medium mt-2">{message}</div>}
          </form>

          {/* Image Section */}
          <div className="relative rounded-3xl overflow-visible shadow-lg">
            <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[var(--brand-color)] rounded-bl-3xl rounded-tl-3xl z-10"></div>
            <img
              src="/assets/comp.png"
              alt="Free Consultation"
              className="w-full  rounded-[24px] md:block sm:hidden hidden object-cover relative z-0"
              
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Complaint;
 