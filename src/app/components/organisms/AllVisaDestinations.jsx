'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import UniversityCountryatom from '../atoms/UniversityCountryatom';
import Button from '../atoms/Button';

const COUNTRIES_PER_PAGE = 6;

const AllVisaDestination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/countries');
        const data = await res.json();

        // Convert backend country data to UI format expected by UniversityCountryatom
        const transformed = data.map((c) => {
          const fee = `${c.consultation_fee} ${c.currency}`;
          const discountFee = `${c.consultation_fee_discount} ${c.currency}`;

          let discount = "";
          if (c.consultation_fee > 0 && c.consultation_fee_discount > 0) {
            const percent = Math.round(
              ((c.consultation_fee - c.consultation_fee_discount) / c.consultation_fee) * 100
            );
            discount = `${percent}% OFF`;
          }

          return {
            name: `${c.country} (${c.code})`,
            flag: c.image || '/assets/uni.png',
            discounted: discountFee,
            actual: fee,
            discount,
          };
        });

        setCountries(transformed);
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">Loading countries...</div>
      </div>
    );
  }

  const totalPages = Math.ceil(countries.length / COUNTRIES_PER_PAGE);
  const startIndex = (currentPage - 1) * COUNTRIES_PER_PAGE;
  const endIndex = startIndex + COUNTRIES_PER_PAGE;
  const paginatedCountries = countries.slice(startIndex, endIndex);

  return (
    <div className="">
      {/* Country Cards */}
      <UniversityCountryatom heading="All Visa Destinations" data={paginatedCountries} />
      {/* Pagination */}
      {countries.length > COUNTRIES_PER_PAGE && (
        <div className="flex flex-col items-center mt-10 gap-3">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, countries.length)} of {countries.length} destinations
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`${currentPage === 1
                ? 'bg-gray-200 text-yellow-600 cursor-not-allowed'
                : 'bg-[var(--brand-color)] text-white hover:bg-[#095a62]'
                }`}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            <span className="py-2 px-4 text-sm text-[#0B6D76]">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={`${currentPage === totalPages
                ? 'bg-gray-200 text-yellow-600 cursor-not-allowed'
                : 'bg-[var(--brand-color)] text-white hover:bg-[#095a62]'
                }`}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllVisaDestination;
