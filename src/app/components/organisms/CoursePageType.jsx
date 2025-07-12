import React from 'react';

const CoursePageType = ({ title, subtitle, image, onClick, icon }) => {
  return (
    <div
      className="relative overflow-visible transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="rounded-tl-[80px] rounded-tr-[80px] rounded-br-[80px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full object-cover rounded-tl-[80px] rounded-tr-[80px] rounded-br-[80px]"
        />
      </div>
      {/* Content Box */}
      <div className="absolute -bottom-[40px] right-[10%] w-[70%] bg-[#E7F1F2] bg-opacity-95 backdrop-blur-md px-8 py-[20px] rounded-tl-[80px] rounded-tr-[80px] rounded-br-[80px] shadow-md">
        <div className={`flex items-center justify-between ${icon === false ? 'justify-center' : ''}`}>
          <div className={`text-center ${icon === false ? '' : 'text-left'}`}>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
          {/* Show icon only if icon !== false */}
          {icon !== false && (
            <div className="bg-[var(--brand-color)] text-white p-4 rounded-full group-hover:bg-teal-700 transition-colors">
              {icon ? (
                icon
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                </svg>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePageType;
