'use client';

import { useState } from "react";
import Container from "../../components/atoms/Container";
import Heading from "../../components/atoms/Heading";
import Paragraph from "../../components/atoms/Paragraph";
import Link from "next/link";
import Button from "../../components/atoms/Button";
import StudentSuccess from "../../components/organisms/StudentSuccess";
import MinhajCountry from "../../components/molecules/MInhajCountry";
import { Input, Select } from "../free-consultation/page";
import { FaFlag, FaGlobe, FaUser } from "react-icons/fa";
import { MdOutlineMail, MdOutlinePhoneEnabled } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { LiaDiceSolid } from "react-icons/lia";
import { FcDepartment } from "react-icons/fc";
import { Loader2, CheckCircle2 } from "lucide-react";

function MinhajUniversity() {
  const [formData, setFormData] = useState({
    full_name: '',
    roll_number: '',
    department: '',
    email: '',
    last_education: '',
    country: '',
    city: '',
    interested_country: '',
    apply_for: '',
    whatsapp_number: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/minhaj-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      await res.json();
      setSuccess(true);
      setFormData({
        full_name: '',
        roll_number: '',
        department: '',
        email: '',
        last_education: '',
        country: '',
        city: '',
        interested_country: '',
        apply_for: '',
        whatsapp_number: '',
      });

      setTimeout(() => setSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { id: 1, number: "Admission Support", label: "Guidance with applications" },
    { id: 2, number: "Scholarships", label: "Assistance with funding" },
    { id: 3, number: "Visa Help", label: "Guidance for visa approval" },
    { id: 4, number: "IELTS Training", label: "Preparation for language test" },
  ];

  return (
    <div>
      <div className="mihaj">
        <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] flex items-end justify-center overflow-hidden">
          <img
            src="/assets/minhaj.png"
            alt="Hero Background"
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]"></div>

          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto pb-12">
            <Heading level={1}>
              <div className="text-white md:leading-[92px] mb-[10px] leading-[34px]">
                Minhaj University Students – Study Abroad for FREE
              </div>
            </Heading>
            <Paragraph>
              <p className="text-white w-[65%] mx-auto leading-relaxed">
                Get expert help for admissions, scholarships, visas, and IELTS prep — at no cost to Minhaj students.
              </p>
            </Paragraph>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Link href={"/free-consultation"}>
                <Button size="lg" className="text-white text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                  Start Your Free Application
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Container>
        <div className="bg-white py-16">
          <div className="flex flex-col lg:flex-row items-center gap-[80px]">
            <div>
              <img className="w-[100%]" src="/assets/visit.png" alt="" />
            </div>

            <div className="xl:w-[30%]">
              <div className="grid xl:grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.id} className="bg-gray-100 flex flex-col items-center rounded-lg p-6 text-center">
                    <div className="w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {stat.id}
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <MinhajCountry />
      <Container>
        <StudentSuccess />

        <div className="main md:py-12 sm:py-2 py-2 relative">
          {success && (
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-500 text-green-800 px-6 py-2 rounded-lg flex items-center gap-2 shadow-md z-10">
              <CheckCircle2 size={20} /> Form submitted successfully!
            </div>
          )}

          <div className="mb-6 max-w-[900px] mx-auto text-center">
            <Heading level={3}>
              Apply Now to Study Abroad via Minhaj <span className="text-[#0B6D76]">University Lahore</span>
            </Heading>
          </div>

          <form onSubmit={handleSubmit} className="applyMinhaj grid md:grid-cols-2 gap-[40px]">
            <div className="grid gap-4">
              <div className="grid xl:grid-cols-2 gap-4">
                <Input icon={<FaUser />} placeholder="Enter Your Name" value={formData.full_name} onChange={(e) => handleChange('full_name', e.target.value)} />
                <Input icon={<LiaDiceSolid />} placeholder="University Roll Number" value={formData.roll_number} onChange={(e) => handleChange('roll_number', e.target.value)} />
                <Input icon={<FcDepartment />} placeholder="Department" value={formData.department} onChange={(e) => handleChange('department', e.target.value)} />
                <Input icon={<MdOutlineMail />} placeholder="Enter Your Email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />
                <Input icon={<MdOutlinePhoneEnabled />} placeholder="Phone" value={formData.whatsapp_number} onChange={(e) => handleChange('whatsapp_number', e.target.value)} />
                <Input icon={<HiOutlineAcademicCap />} placeholder="Last Education" value={formData.last_education} onChange={(e) => handleChange('last_education', e.target.value)} />
                <Input icon={<FaFlag />} placeholder="Enter Your City" value={formData.city} onChange={(e) => handleChange('city', e.target.value)} />
                <Select name="state" icon={<FaGlobe />} placeholder="Select Interested Country" options={['Canada', 'UK', 'Australia']} value={formData.interested_country} onChange={(e) => handleChange('interested_country', e.target.value)} />
                <Input icon={<FaUser />} placeholder="Apply For (e.g, Study Visa)" value={formData.apply_for} onChange={(e) => handleChange('apply_for', e.target.value)} />
              </div>

              <div>
                <Button type="submit" disabled={loading} className="flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                  {loading ? "Submitting..." : "Get Started Now (Free)"}
                </Button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-visible shadow-lg">
              <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 h-[80%] w-[30px] bg-[var(--brand-color)] rounded-bl-3xl rounded-tl-3xl z-10"></div>
              <img
                src="/assets/comp.png"
                alt="Free Consultation"
                className="w-full h-[549px] rounded-[24px] object-cover hidden md:block"
              />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default MinhajUniversity;
