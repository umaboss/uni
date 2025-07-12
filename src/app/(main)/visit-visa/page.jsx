'use client';

import React from 'react';
import Heading from '../../components/atoms/Heading';
import Container from '../../components/atoms/Container';
import Paragraph from '../../components/atoms/Paragraph';

const VisitVisa = () => {
  return (
    <Container>
      <div className="text-center bottom-session-space banner-bottom-space">
        <div className="pb-6 md:pt-[0px] sm:pt-[80px] pt-[80px]">
          <Heading level={3}>
            Visit <span className="text-[#0B6D76] font-medium">Visa</span>
          </Heading>
          <div className="max-w-[700px] mx-auto">
            <Paragraph>
              Information about visit visa services and requirements.
            </Paragraph>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Visa Services</h4>
            <p className="text-gray-600">
              We provide comprehensive visa consultation and application services for various countries.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Requirements</h4>
            <p className="text-gray-600">
              Get detailed information about visa requirements, documents needed, and application process.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VisitVisa; 