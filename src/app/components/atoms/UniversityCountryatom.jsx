'use client';

import Heading from '../atoms/Heading';

const UniversityCountryatom = ({ data = [], heading = "Search By Country" }) => {
  return (
    <section>
      {/* Heading */}
      <div className="text-center lg:mb-12 md:mb-8 sm:mb-4 mb-4">
        <Heading level={3}>
          {heading.split(' ').map((word, index) =>
            word.toLowerCase() === 'by' ? (
              <span key={index}> {word} </span>
            ) : (
              <span key={index} className="text-[#0B6D76]"> {word} </span>
            )
          )}
        </Heading>
      </div>

      {/* Country Cards */}
      <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-6">
        {data.map((c, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-4 relative hover:shadow-lg transition-all"
          >
            {/* Discount Badge */}
            {c.discount && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                {c.discount}
              </span>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {/* Flag */}
              <img
                src={c.image || c.flag || '/assets/uni.png'}
                alt={c.name || c.country}
                className="w-[100px] h-[100px] rounded-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/uni.png';
                }}
              />

              {/* Info */}
              <div className="flex-1 min-w-[200px]">
                <Heading level={4} className="text-gray-900">{c.name || c.country}</Heading>

                {c.discounted && (
                  <div className="text-green-600 font-bold text-sm mt-1">
                    Discounted Fee: {c.discounted}
                  </div>
                )}

                {c.actual && (
                  <div className="text-gray-500 line-through text-xs">
                    Original Fee: {c.actual}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">No countries available</div>
          <p className="text-gray-400">Countries will appear here once they are added to the system.</p>
        </div>
      )}
    </section>
  );
};

export default UniversityCountryatom;
