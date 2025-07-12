'use client'
import { useState, useMemo } from 'react';
import { universities as allUniversities } from '../utils/universitiesSidebar';

function useUniversitiessidebar() {
  const [filters, setFilters] = useState({
    rating: 0,
    country: 'Select Country',
    university: 'Select Universities',
    scholarship: [],
    qualifications: []
  });

  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 8;

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleScholarshipChange = (option) => {
    const newScholarships = filters.scholarship.includes(option)
      ? filters.scholarship.filter((s) => s !== option)
      : [...filters.scholarship, option];
    handleFilterChange('scholarship', newScholarships);
  };

  const handleQualificationChange = (option) => {
    const newQualifications = filters.qualifications.includes(option)
      ? filters.qualifications.filter((q) => q !== option)
      : [...filters.qualifications, option];
    handleFilterChange('qualifications', newQualifications);
  };

  const filteredUniversities = useMemo(() => {
    return allUniversities.filter((university) => {
      if (filters.country !== 'Select Country' && university.country !== filters.country) return false;

      if (filters.scholarship.length > 0) {
        const hasWithScholarship = filters.scholarship.includes('With Scholarship');
        const hasWithoutScholarship = filters.scholarship.includes('Without Scholarship');
        const hasWithOrWithout = filters.scholarship.includes('With/Without Scholarship');

        if (hasWithOrWithout) {
        } else if (hasWithScholarship && !hasWithoutScholarship) {
          if (!university.hasScholarship) return false;
        } else if (hasWithoutScholarship && !hasWithScholarship) {
          if (university.hasScholarship) return false;
        }
      }

      if (filters.qualifications.length > 0) {
        const hasMatchingQualification = filters.qualifications.some((qual) =>
          university.qualifications.includes(qual)
        );
        if (!hasMatchingQualification) return false;
      }

      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredUniversities.length / universitiesPerPage);
  const startIndex = (currentPage - 1) * universitiesPerPage;
  const currentUniversities = filteredUniversities.slice(startIndex, startIndex + universitiesPerPage);

  const countries = ['Select Country', 'Canada', 'USA', 'UK', 'Australia', 'Germany', 'China', 'Pakistan'];
  const universitiesList = ['Select Universities', ...allUniversities.map((uni) => uni.name)];
  const scholarshipOptions = ['With/Without Scholarship', 'With Scholarship', 'Without Scholarship'];
  const qualificationOptions = [
    'Bachelor',
    'One/Two year program',
    'A level',
    'Associate degree',
    'Other national diploma',
    'Matric',
    'Diploma of higher education',
    'Masters',
    'Diploma/Certification',
    'O level',
    'Foundation Degree',
    'Doctorate',
    'International'
  ];

  const handlePageChange = (page) => setCurrentPage(page);

  return {
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
  };
}

export default useUniversitiessidebar;
