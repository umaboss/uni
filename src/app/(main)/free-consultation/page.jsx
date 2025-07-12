'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaGlobe, FaPhone } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { HiOutlineAcademicCap, HiOutlineCheckCircle } from 'react-icons/hi';
import { PiCity } from 'react-icons/pi';
import Heading from '../../components/atoms/Heading';
import Container from '../../components/atoms/Container';
import Paragraph from '../../components/atoms/Paragraph';
import Button from '../../components/atoms/Button';

// Input Component
export const Input = ({ icon, placeholder, name, type = "text", value, onChange }) => (
  <div className="relative items-center">
     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-12 pr-4 py-4 rounded-[30px] bg-[#E7F1F2] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76]"
    />
  </div>
);

// Select Component
export const Select = ({ icon, placeholder, options = [], name, value, onChange }) => (
  <div className="relative">
    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full pl-12 pr-4 py-4 rounded-[30px] bg-[#E7F1F2] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0B6D76] appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FreeConsultation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    last_education: '',
    country: '',
    city: '',
    apply_for: '',
    interested_country: '',
    assigned_employees: 'admin' // optional static field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/freeconsulation', formData);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Submission Error:', error.response?.data || error.message);
      alert('Form submission failed!');
    }
  };

  return (
    <Container>
      <div className="text-center bottom-session-space banner-bottom-space">
        <div className="pb-6 md:pt-[0px] sm:pt-[80px] pt-[80px]">
          <Heading level={3}>
            Free <span className="text-[#0B6D76] font-medium">Consultation</span>
          </Heading>
          <div className="max-w-[700px] mx-auto">
            <Paragraph>
              Please complete the form below to initiate your study abroad application.
            </Paragraph>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-[80px] items-start">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 w-full">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <Input icon={<FaUser />} placeholder="Enter Your Name" name="name" value={formData.name} onChange={handleChange} />
              <Input icon={<MdOutlineMail />} placeholder="Enter Your Email" name="email" value={formData.email} onChange={handleChange} />
              <Input icon={<FaPhone />} placeholder="Phone" name="phone_number" value={formData.phone_number} onChange={handleChange} />
              <Select name="last_education" icon={<HiOutlineAcademicCap />} placeholder="Select Last Education" value={formData.last_education} onChange={handleChange} options={['Metric', 'Inter', 'BS']} />
              <Select name="country" icon={<FaGlobe />} placeholder="Select Country" value={formData.country} onChange={handleChange} options={['Australia', 'China', 'US']} />
              <Select name="city" icon={<PiCity />} placeholder="Select City" value={formData.city} onChange={handleChange} options={['Lahore', 'Karachi', 'Sydney']} />
              <Select name="apply_for" icon={<HiOutlineCheckCircle />} placeholder="Apply For" value={formData.apply_for} onChange={handleChange} options={['Study Visa', 'Visit Visa']} />
              <Select name="interested_country" icon={<FaGlobe />} placeholder="Interested Country" value={formData.interested_country} onChange={handleChange} options={['Australia', 'China', 'US']} />
            </div>

            <Button type="submit">Submit Consultation</Button>
          </form>

          <div className="relative rounded-3xl overflow-visible shadow-lg">
            <img
              src="/assets/comp.png"
              alt="Free Consultation"
              className="w-full rounded-[24px] md:block sm:hidden hidden object-cover relative z-0"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FreeConsultation;
