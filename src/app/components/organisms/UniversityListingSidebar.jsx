'use client';

import useUniversitiessidebar from '@/app/hooks/useUniversitiessidebar';
import Image from 'next/image';
import React, { useState } from 'react';
import Button from '../atoms/Button';
import Container from '../atoms/Container';
import Heading from '../atoms/Heading';

const UniversityListingSidebar = () => {
  const {
    filters,
    handleFilterChange,
    currentUniversities,
    countries,
    universitiesList,
    scholarshipOptions,
    qualificationOptions,
    currentPage,
    totalPages,
    handlePageChange,
    handleScholarshipChange,
    handleQualificationChange
  } = useUniversitiessidebar();

  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="heros">
      {/* HERO SECTION */}
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] sm:h-[60vh] flex items-end justify-center overflow-hidden">
        <img
          src="/assets/s.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]" />
        <div className="relative z-20 text-center px-4 max-w-[1000px] mx-auto pb-12">
          <Heading level={1}>
            <div className="text-white leading-[52px] sm:leading-[36px] text-[30px] sm:text-[22px]">
              Search University /Courses/ Articles /Guides
            </div>
          </Heading>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <Container className="px-4 sm:px-2">
        <div className="bottom-session-space banner-bottom-space">
          <h1 className="text-4xl font-bold mb-6 text-center">University</h1>

          {/* MOBILE SIDEBAR */}
          <div className="block sm:hidden bg-[#E7F1F2] h-[500px] p-4 space-y-4 rounded-2xl mb-6">
            {/* Rating */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className="text-teal-600 text-xl">★</span>
                ))}
              </div>
            </div>

            {/* Country */}
            <div>
              <Button className='w-full'>
                <select
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  className="w-full text-white outline-none text-sm"
                >
                  {countries.map((country) => (
                    <option className="text-black" key={country} value={country}>{country}</option>
                  ))}
                </select>
              </Button>
            </div>

            {/* University */}
            <div>
              <Button className='w-full'>
                <select
                  value={filters.university}
                  onChange={(e) => handleFilterChange('university', e.target.value)}
                  className="w-full text-white outline-none text-sm"
                >
                  {universitiesList.map((university) => (
                    <option className="text-black" key={university} value={university}>{university}</option>
                  ))}
                </select>
              </Button>
            </div>

            {/* View More Button */}
            <div className='flex justify-center'> 
              <Button className="w-[60%]" onClick={() => setShowMoreFilters(!showMoreFilters)}>
                {showMoreFilters ? 'Hide More Filters' : 'View More Filters'}
              </Button>
            </div>

            {/* Extra Filters (Toggle) */}
            {showMoreFilters && (
              <div className="space-y-4 transition-all duration-300">
                {/* Scholarship */}
                <div>
                  <h4 className="text-gray-700 font-medium mb-2">Scholarship</h4>
                  <div className="space-y-2">
                    {scholarshipOptions.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.scholarship.includes(option)}
                          onChange={() => handleScholarshipChange(option)}
                          className="form-checkbox h-4 w-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Qualifications */}
                <div>
                  <h4 className="text-gray-700 font-medium mb-2">Qualifications</h4>
                  <div className="flex flex-col gap-2">
                    {qualificationOptions.map((option) => (
                      <label key={option} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.qualifications.includes(option)}
                          onChange={() => handleQualificationChange(option)}
                          className="form-checkbox h-4 w-4 text-teal-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Desktop Sidebar */}
            <div className="hidden sm:block lg:col-span-1 bg-[#E7F1F2] p-6 space-y-6 rounded-[24px] sticky top-4">
              {/* Rating */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Rating</label>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <span key={index} className="text-teal-600 text-xl">★</span>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <Button className='w-full'>
                  <select
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    className="w-full text-white outline-none text-sm"
                  >
                    {countries.map((country) => (
                      <option className="text-black" key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </Button>
              </div>

              {/* University */}
              <div>
                <Button className='w-full'>
                  <select
                    value={filters.university}
                    onChange={(e) => handleFilterChange('university', e.target.value)}
                    className="w-full text-white outline-none text-sm"
                  >
                    {universitiesList.map((university) => (
                      <option className="text-black" key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </Button>
              </div>

              {/* Scholarship */}
              <div>
                <h4 className="text-gray-700 font-medium mb-2">Scholarship</h4>
                <div className="space-y-2">
                  {scholarshipOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.scholarship.includes(option)}
                        onChange={() => handleScholarshipChange(option)}
                        className="form-checkbox h-4 w-4 text-teal-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Qualifications */}
              <div>
                <h4 className="text-gray-700 font-medium mb-2">Qualifications</h4>
                <div className="flex flex-col gap-2">
                  {qualificationOptions.map((option) => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.qualifications.includes(option)}
                        onChange={() => handleQualificationChange(option)}
                        className="form-checkbox h-4 w-4 text-teal-600"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Universities List */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 md:gap-6 sm:gap-12   gap-12 ">
              {currentUniversities.length > 0 ? (
                currentUniversities.map((uni) => (
                  <div key={uni.id} className="bg-[#E7F1F2] md:max-h-[360px] sm:max-h-[400px] max-h-[450px] rounded-2xl p-4 shadow hover:shadow-lg transition relative">
                    <div className="absolute top-0 right-0 text-white text-sm px-3 py-1 bg-[var(--brand-color)] rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px]">
                      {uni.discount}% OFF
                    </div>
                    <div className="flex flex-col sm:flex-row gap-[20px] mb-4 pt-[30px] text-center sm:text-left">
                      <div className="flex justify-center sm:justify-start">
                        <Image src={uni.logo || '/university-placeholder.png'} alt={uni.name} width={80} height={80} className="rounded-full object-contain" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-800 mb-2">Discounted Fee: {uni.discountedFee.toLocaleString()} PKR</p>
                        <p className="text-gray-500 text-sm mb-1">Actual Fee: <span className="line-through">{uni.actualFee.toLocaleString()} PKR</span></p>
                        <p className="text-teal-600 font-medium mb-2">{uni.name} ({uni.location})</p>
                      </div>
                    </div>
                    <div className="text-center max-w-md mx-auto">
                      <div className="mb-2 flex flex-col sm:flex-row gap-3">
                        <Button className="w-full">{uni.courses} Courses</Button>
                        <Button className="w-full">Request Information</Button>
                      </div>
                      <div className="mb-4">
                        <Button className="md:w-full sm:w-[30%] ">Free Consultation</Button>
                      </div>
                      <div className="text-gray-500 text-sm">{uni.deadline}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-lg col-span-full">No universities found matching your criteria.</p>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8 col-span-full space-x-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-8 h-8 rounded flex items-center justify-center border 
                      ${page === currentPage ? 'bg-teal-600 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UniversityListingSidebar;
