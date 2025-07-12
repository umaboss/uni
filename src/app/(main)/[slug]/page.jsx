'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaVoicemail,
  FaWhatsapp,
} from "react-icons/fa";
import { Input, Select } from "../free-consultation/page";
import { FaPhone, FaUser, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { MdOutlineMailLock } from "react-icons/md";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Button from "../../components/atoms/Button";
import Container from "../../components/atoms/Container";
import Heading from "../../components/atoms/Heading";
import Paragraph from "../../components/atoms/Paragraph";
import { blogService } from "../../services/blog.service";
import countriesData from "../../utils/countriesData";

const API_BASE_URL = "http://localhost:5000";
const ITEMS_PER_PAGE = 6;

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(countriesData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = countriesData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBlogBySlug(slug);
        if (response.success && response.data) {
          setArticle(response.data);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!article) return <div className="p-8 text-center">Article not found.</div>;

  let imageUrl = null;
  if (article.image && typeof article.image === "string") {
    try {
      if (article.image.startsWith("/")) {
        imageUrl = `${API_BASE_URL}${article.image}`;
      } else if (article.image.startsWith("http")) {
        imageUrl = article.image;
      } else {
        imageUrl = `${API_BASE_URL}/${article.image}`;
      }
      new URL(imageUrl); // Validate URL
    } catch (error) {
      console.error("Invalid image URL:", article.image, error);
      imageUrl = null;
    }
  }

  const articleUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div>
      <Container>
        <div className="flex pt-[80px] flex-col justify-center items-center">
          <Heading level={3} className="mb-4">{article.title}</Heading>
          <p>Author Name <span> - {article.createdAt}</span></p>

          {/* Social Share Buttons */}
          <div className="flex gap-[10px] mt-4">
            {[
              {
                Icon: FaFacebook,
                name: "Facebook",
                getUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
              },
              {
                Icon: FaTwitter,
                name: "Twitter",
                getUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
              },
              {
                Icon: FaLinkedin,
                name: "LinkedIn",
                getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
              },
              {
                Icon: FaWhatsapp,
                name: "WhatsApp",
                getUrl: (url, title) => `https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + url)}`
              },
            ].map(({ Icon, name, getUrl }, index) => (
              <a
                key={index}
                className="flex items-center text-[14px] gap-[10px]"
                href={getUrl(articleUrl, article.title)}
                rel="noopener noreferrer"
                title={`Share on ${name}`}
              >
                <div className="bg-[var(--brand-color)] w-[40px] h-[40px] rounded-full flex justify-center items-center text-white text-[16px]">
                  <Icon />
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-none mt-8">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={article.title}
              width={800}
              height={200}
              className="w-full h-[55vh] object-cover mb-6"
              onError={(e) => {
                console.error("Image failed to load:", imageUrl);
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 rounded mb-6 flex items-center justify-center">
              <span className="text-gray-500">No image available</span>
            </div>
          )}
        </div>

        <div className="py-[20px]">
          <Paragraph className="mb-4 text-gray-600">{article.short_description}</Paragraph>
        </div>

        <div className="prose max-w-none mt-6 px-6" dangerouslySetInnerHTML={{ __html: article.description }} />

        {/* Join Communities */}
        <div className="pb-[50px]">
          <h1 className="text-[44px] pb-[10px]">Join Communities</h1>
          <div className="flex gap-[20px]">
            <button className="bg-[var(--brand-color)] text-white rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] px-5 py-2 font-medium text-sm cursor-pointer shadow-md transition-all duration-200">Join Facebook Community</button>
            <button className="bg-[var(--brand-color)] text-white rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] px-5 py-2 font-medium text-sm cursor-pointer shadow-md transition-all duration-200">Join WhatsApp Community</button>
          </div>
        </div>
      </Container>

      {/* Slider Section */}
      <Container>
        <div className="text-center">
          <Heading level={3}>You might be interested in...</Heading>
        </div>

        <div className="px-6 py-10">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: '.interest-prev',
              nextEl: '.interest-next',
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {currentData.map(({ id, title, image }) => (
              <SwiperSlide key={id}>
                <div className="flex flex-col justify-between bg-[#eef6f7] p-4 rounded-[40px] shadow-md h-[450px]">
                  <div className="flex items-center gap-4 mb-[20px] min-h-[80px]">
                    <div className="w-[50px] h-[50px] bg-white text-[#006666] font-semibold flex items-center justify-center rounded-[40px] border-b-4 border-[#0B6D76] shadow">
                      {id.toString().padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <Heading level={4}>{title}</Heading>
                    </div>
                  </div>
                  <div className="flex-grow" />
                  <div className="w-full overflow-hidden rounded-tr-[82px] rounded-br-[82px] rounded-bl-[82px] mt-auto">
                    <Image
                      src={image}
                      alt={title}
                      width={552}
                      height={423}
                      className="object-cover w-full h-[300px] rounded-tr-[82px] rounded-br-[82px] rounded-bl-[82px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button className="interest-prev bg-[var(--brand-color)] p-3 lg:p-4 rounded-full shadow-md hover:bg-[#095d65] transition" aria-label="Previous Slide">
              <FaChevronLeft className="text-white" />
            </button>
            <button className="interest-next bg-[var(--brand-color)] p-3 lg:p-4 rounded-full shadow-md hover:bg-[#095d65] transition" aria-label="Next Slide">
              <FaChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </Container>

      {/* Contact Form Section */}
      <Container>
        <div className="pb-6 text-center md:pt-0 sm:pt-[80px] pt-[80px]">
          <Heading level={3}>Add Your Comment</Heading>
        </div>

        <div className="form flex justify-center px-4">
          <div className="left-main w-full max-w-3xl">
            <div className="form-left grid grid-cols-1 gap-6">
              <div className="input grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                <Input name="name" icon={<FaUser />} placeholder="First Name" />
                <Input icon={<MdOutlineMailLock />} placeholder="Last Name" />
                <Input name="phone" icon={<FaPhone />} placeholder="Phone" />
                <Input name="Email" icon={<FaVoicemail />} placeholder="Email" />
              </div>

              <textarea
                name="details"
                placeholder="Enter Details"
                className="px-4 py-4 rounded-tl-[30px] rounded-tr-[30px] rounded-br-[30px] bg-[#E7F1F2] text-sm resize-none h-[120px] placeholder-gray-500"
              />

              <Button>Submit Complaint</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
