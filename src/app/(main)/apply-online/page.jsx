'use client';

import { useState } from 'react';
import Heading from '../../components/atoms/Heading';
import { FaUser, FaGlobe, FaGlobeAmericas } from 'react-icons/fa';
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { HiOutlineAcademicCap, HiOutlineCheckCircle } from 'react-icons/hi';
import { PiCity } from "react-icons/pi";
import Button from '../../components/atoms/Button';
import Container from '../../components/atoms/Container';
import Paragraph from '../../components/atoms/Paragraph';
import { Input, Select } from '../free-consultation/page';

const ApplyOnline = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    last_education: '',
    country: '',
    state: '',
    city: '',
    intrested_country: '',
    office: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      phone_number: formData.phone_number,
      last_education: formData.last_education,
      intrested_country: formData.intrested_country,
    };

    try {
      const res = await fetch('/api/applynow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone_number: '',
          last_education: '',
          country: '',
          state: '',
          city: '',
          intrested_country: '',
          office: '',
        });
      } else {
        setSuccess(false);
      }
    } catch (err) {
      console.error(err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="text-center bottom-session-space banner-bottom-space">
        {/* Heading */}
        <div className="pb-6 md:pt-[0px] sm:pt-[80px] pt-[80px]">
          <Heading level={3}>
            Apply <span className="text-[#0B6D76] font-medium"> Online</span>
          </Heading>
          <div className="max-w-[700px] mx-auto">
            <Paragraph>
              Please complete the form below to initiate your study abroad application. Our expert team will provide you a free assessment and reach out to guide you through the next steps.
            </Paragraph>
          </div>
        </div>

        {/* Main Grid: Form + Image */}
        <div className="grid md:grid-cols-2 gap-[80px] items-start">
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 w-full">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
              <Input icon={<FaUser />} placeholder="Enter Your Name" name="name" value={formData.name} onChange={e => handleChange('name', e.target.value)} />
              <Input icon={<MdOutlineMail />} placeholder="Enter Your Email" name="email" value={formData.email} onChange={e => handleChange('email', e.target.value)} />
              <Input icon={<MdOutlinePhoneEnabled />} placeholder="Phone" name="phone_number" value={formData.phone_number} onChange={e => handleChange('phone_number', e.target.value)} />
              <Select name="last_education" icon={<HiOutlineAcademicCap />} placeholder="Select Last Education" value={formData.last_education} onChange={e => handleChange('last_education', e.target.value)} options={['Metric', 'Inter', 'BS']} />
              <Select name="country" icon={<FaGlobe />} placeholder="Select Country" value={formData.country} onChange={e => handleChange('country', e.target.value)} options={['Australia', 'China', 'US']} />
              <Select name="state" icon={<FaGlobeAmericas />} placeholder="Select State" value={formData.state} onChange={e => handleChange('state', e.target.value)} options={['Punjab', 'California', 'Sindh']} />
              <Select name="city" icon={<PiCity />} placeholder="Select City" value={formData.city} onChange={e => handleChange('city', e.target.value)} options={['Lahore', 'Karachi', 'Sydney']} />
              <Select name="intrested_country" icon={<FaGlobe />} placeholder="Select Interest Country" value={formData.intrested_country} onChange={e => handleChange('intrested_country', e.target.value)} options={['Australia', 'China', 'US']} />
            </div>

            <Select name="office" icon={<HiOutlineCheckCircle />} placeholder="Office Location" value={formData.office} onChange={e => handleChange('office', e.target.value)} options={['Punjab', 'Sindh', 'California']} />

            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Offer'}
            </Button>

            {/* {success && <p className="text-green-600">Application submitted successfully!</p>} */}
            {/* {success === false && <p className="text-red-600">Submission failed. Please try again.</p>} */}
          </form>

          {/* Image Section */}
          <div className="relative rounded-3xl overflow-visible shadow-lg">
            <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[var(--brand-color)] rounded-bl-3xl rounded-tl-3xl z-10"></div>
            <img
              src="/assets/aply.png"
              alt="Apply Online"
              className="w-full rounded-[24px] md:block sm:hidden hidden object-cover relative z-0"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ApplyOnline;