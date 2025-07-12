'use client';

import { useEffect, useState } from 'react';
import UniversityCountryatom from '../atoms/UniversityCountryatom';
import Button from '../atoms/Button';
import Link from 'next/link';

const UniversityCountrySection = () => {
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

  const limitedCountries = countries.slice(0, 4);
  
  return (
    <div>
      <UniversityCountryatom data={limitedCountries} />
      {countries.length > 4 && (
        <div className="text-center mt-16">
          <Link href={"/visit-visa"}>
            <Button>See All</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UniversityCountrySection;
