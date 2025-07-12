import { IoMdCheckmarkCircleOutline } from "react-icons/io";


const VisitvisaCompanyInfo = () => {
  const stats = [
    { number: "03", label: "Offices" },
    { number: "100+", label: "Staff" },
    { number: "7+", label: "Years Experience" },
    { number: "4.8", label: "Star Rating" }
  ];

  return (
    <div className="bg-white ">
      <div className="">
        <div className="flex flex-col lg:flex-row items-center gap-[80px]">
          {/* Left Side - Image */}
          <div className="">
            <img className="w-[100%]" src="/assets/visit.png" alt="" />
          </div>
          {/* Right Side - Stats */}
          <div className="xl:w-[30%] lg:w-[40%] md:w-[50%] sm:w-[100%] w-[100%]">
            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-100 flex flex-col justify-center items-center gap-[20px] rounded-lg md:p-6 sm:p-2 p-2 text-center ">
                  <div className=" w-8 h-8 bg-[var(--brand-color)] rounded-full flex items-center justify-center text-white text-xs">
                    <IoMdCheckmarkCircleOutline />
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <div className="md:text-2xl sm:text-md text-md font-bold text-gray-800 mb-1">{stat.number}</div>
                    <div className="text-[12px] text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitvisaCompanyInfo;



;