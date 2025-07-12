// src/components/SearchBar.jsx

'use client';
import React from 'react';
import Button from '../atoms/Button';
import Container from '../atoms/Container';

const SearchBar = () => {
  return (
    <div className="bg-[#eaf3f5] py-6 ">
      <Container>
        <div className=" mx-auto flex flex-col md:flex-row items-center gap-4 md:gap-6">
          {/* Search For Dropdown */}
          <select className="w-full md:w-1/4 border-b-2 border-gray-300 bg-transparent focus:outline-none py-2 text-sm text-gray-700">
            <option>Search For</option>
            <option>Courses</option>
            <option>Universities</option>
          </select>
          {/* Select Country Dropdown */}
          <select className="w-full md:w-1/4 border-b-2 border-gray-300 bg-transparent focus:outline-none py-2 text-sm text-gray-700">
            <option>Select Country</option>
            <option>USA</option>
            <option>UK</option>
            <option>Canada</option>
          </select>
          {/* Search Text Input */}
          <input
            type="text"
            placeholder="Search University and course"
            className="w-full md:w-1/4 border-b-2 border-gray-300 bg-transparent focus:outline-none py-2 text-sm text-gray-700"
          />
          {/* Search Button */}
          <div className="w-full md:w-fit">
            <Button>Search now</Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchBar;
