import React from 'react';

const CoursesPageSubject = ({ title, subtitle, image, onClick }) => {
  return (
    <div
      className="bg-[#E7F1F2] rounded-[44px] p-6  cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Small left border indicator */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[120px] bg-[var(--brand-color)] rounded-r-md"></span>
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full overflow-hidden border-2 border-dotted border-[#0B6D76] p-1">
          <img
            src={image}
            alt={title}
            className="w-[168px] object-cover rounded-full"
          />
        </div>
        <div className="text-center w-full">
          <h3 className="text-base font-semibold text-gray-800 leading-tight">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default CoursesPageSubject;
