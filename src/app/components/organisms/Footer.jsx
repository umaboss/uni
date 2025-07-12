'use client';
import { useState } from 'react';
import Container from "../atoms/Container";
import FooterMolecule from "../molecules/FooterMolecule";
import { SocialIcons } from "../molecules/SocialIcons";
import Link from 'next/link';

const locationDetails = {
  Lahore: 'Universities Page,2nd Floor faisal bank,Raja Market,Garden town,Lahore',
  Islamabad: 'Universities Page, Punjab market,Venus Plaza, 1st Floor, Office No. 1, Sector G13/4,Islamabad',
  Thailand: '70 Young Pl Alley, Khwaeng Khlong Toei Nuea, Watthana, Krung Thep Maha Nakhon ,Thailand. ',
  Karachi: 'Universities Page,1st floor, Amber Estate, Shahrah-e-Faisal Rd, Bangalore Town Block A Shah, Karachi, Sindh',
  China: 'Universities Page,East road of Madian plaza, Hai Dian District, Beijing, China',
};

const FooterOrganism = () => {
  const [selectedCity, setSelectedCity] = useState('');
  return (
    <footer className="bg-[#E7F1F2] xl:pt-[80px] lg:pt-[80px] md:pt-[80px] sm:pt-[40px] pt-[30px]">
      <Container>
        <div className="text-gray-800 px-4 sm:px-6 py-10 space-y-10">
          {/* Top Section */}
          <div>
            <FooterMolecule />
          </div>
          {/* Main Footer Info Section */}
          <div className="border-t border-gray-300 pt-10 flex flex-col lg:flex-row lg:justify-between lg:gap-20 gap-10">
            {/* Menu Links */}
            <div>
              <h4 className="font-semibold mb-4  lg:text-left">Menu Links</h4>
              <div className="flex flex-row  gap-6 justify-center lg:justify-start">
                <ul className="space-y-2 ">
                  <li><Link href={'/CountriesGuide'}>Guide</Link></li>
                  <li><Link href={'universities'}>Universities</Link></li>
                  <li><Link href={'courses'}>Courses</Link></li>
                  <li>Search</li>
                  <li><Link href={'articles'}>Articles</Link></li>
                </ul>
                <ul className="space-y-2 ">
                  <li><Link href={'visit-visa'}>Visit Visa</Link></li>
                  <li><Link href={'free-consultation'}>Free Consultation</Link></li>
                  <li>Complaint</li>
                  <li>100% Discount Offer</li>
                </ul>
              </div>
            </div>
            {/* Address Dropdowns */}
            <div className="w-full sm:w-auto">
              <h4 className="font-semibold mb-4">Address</h4>
              <div className="grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 grid-cols-2 sm:grid-cols-2 gap-4">
                {Object.entries(locationDetails).map(([city, paragraph], index) => (
                  <div
                    key={index}
                    className="border-b border-[#00000033] pb-2 w-full max-w-[250px] cursor-pointer"
                    onClick={() => setSelectedCity(selectedCity === city ? '' : city)} // toggle logic
                  >
                    <div className="font-medium text-gray-800 hover:text-[#0B6D76] transition">
                      {city}
                    </div>
                    {selectedCity === city && (
                      <p className="mt-2 text-sm text-gray-700">
                        {paragraph}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Icons */}
            <div className="w-full sm:w-auto ">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex justify-center lg:justify-start">
                <SocialIcons />
              </div>
            </div>
          </div>
        </div>
      </Container>
      {/* Bottom Bar */}
      <div className="bg-[#0b4d4b] mt-10">
        <Container>
          <div className="text-white py-4 px-4 text-sm flex flex-col md:flex-row justify-between items-center gap-3 text-center">
            <span>Copyright© Universities Page. All rights reserved.</span>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Feedback</a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default FooterOrganism;
