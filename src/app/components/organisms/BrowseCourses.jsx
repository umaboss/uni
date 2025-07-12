'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';

import Container from '../atoms/Container';
import QualificationItem from '../molecules/QualificationItem';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import qualificationsPages from '../../utils/qualifications';

const BrowseCourses = () => {
  return (
    <section className="bg-white">
      <Container>
        <div className="relative">
          {/* Arrows */}
          <div className="absolute top-[100%] xl:right-[45%] lg:right-[45%] md:right-[30%] sm:right-[25%] right-[30%] flex gap-4 z-10">
            <button className="browse-prev bg-[#0B6D76] p-3 rounded-full shadow-md cursor-pointer">
              <FaChevronLeft className="text-white" />
            </button>
            <button className="browse-next bg-[#0B6D76] p-3 rounded-full shadow-md cursor-pointer">
              <FaChevronRight className="text-white" />
            </button>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.browse-prev',
              nextEl: '.browse-next',
            }}
            spaceBetween={30}
          >
            {qualificationsPages.map((qualifications, pageIndex) => (
              <SwiperSlide key={pageIndex}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                  {/* Left Side - Image Section (only for md and up) */}
                  <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 auto-rows-fr">

                    {/* Large Card with Badge */}
                    <div className="relative overflow-hidden aspect-[3/4] md:aspect-auto md:h-96 lg:h-full md:min-h-[400px] lg:min-h-[600px] lg:row-span-2 w-full">
                      <img
                        src="/assets/b1.png"
                        alt="Main Image"
                        className="w-full h-auto object-cover"
                      />
                      <div className="absolute inset-0"></div>
                      <div className="absolute bottom-6 left-6 z-10">
                        <div className="flex items-center space-x-3 bg-white/95 backdrop-blur-sm rounded-full px-4 py-3 shadow-lg">
                          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">🏆</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">30 Years Of</span>
                            <span className="text-sm font-semibold text-gray-700">Quality Service</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medium Card 1 */}
                    <div className="overflow-hidden aspect-[4/5] md:aspect-auto md:h-72 lg:h-72 w-full">
                      <img
                        src="/assets/b2.png"
                        alt="Team collaboration"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Medium Card 2 */}
                    <div className="overflow-hidden aspect-[4/5] md:aspect-auto md:mb-[-15%] w-full">
                      <img
                        src="/assets/b3.png"
                        alt="Professional woman"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Right Side - Text Content */}
                  <div>
                    <Heading level={3}>
                      Browse courses by their{' '}
                      <span className="text-[#0B6D76]">qualification type</span>
                    </Heading>
                    <div className="mb-8">
                      <Paragraph>Select one of these options to get started.</Paragraph>
                    </div>
                    <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4">
                      {qualifications.map((q) => (
                        <QualificationItem
                          key={q.number}
                          number={q.number}
                          title={q.title}
                        />
                      ))}
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default BrowseCourses;
