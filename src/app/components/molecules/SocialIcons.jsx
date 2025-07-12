import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";





export const SocialIcons = () => (
  <div className="flex grid xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-5 sm:grid-cols-5 grid-cols-5 gap-4 text-sm">
    <a className="flex items-center text-[14px] gap-[10px]" href="#"><div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]"><FaFacebook /></div> <div className=" md:block hidden">Facebook</div></a>
    <a className="flex items-center text-[14px] gap-[10px]" href="#"><div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]"><FaTwitter /></div> <div className=" md:block hidden">Twitter</div></a>
    <a className="flex items-center text-[14px] gap-[10px]" href="#"><div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]"><FaLinkedin /></div> <div className=" md:block hidden">LinkedIn</div></a>
    <a className="flex items-center text-[14px] gap-[10px]" href="#"><div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]"><FaInstagram /></div><div className=" md:block hidden">Instagram</div> </a>
    <a className="flex items-center text-[14px] gap-[10px]" href="#"><div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]"><FaWhatsapp /></div> <div className=" md:block hidden">Whatsapp</div></a>
  </div>
); 