'use client';

import { useState, useEffect, useMemo } from 'react';
import ArticleCard from '../../components/molecules/ArticleCard';
import Button from '../../components/atoms/Button';
import Heading from '../../components/atoms/Heading';
import Container from '../../components/atoms/Container';
import Paragraph from '../../components/atoms/Paragraph';
import { IoSearch } from "react-icons/io5";

const ARTICLES_PER_PAGE = 6;

const ArticlePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/blogs');
        const data = await res.json();
        if (data && data.data) {
          setBlogs(data.data);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Extract unique categories from blogs
  const categories = useMemo(() => {
    const cats = new Set(['All']);
    blogs.forEach(blog => {
      if (blog.category && blog.category.name) {
        cats.add(blog.category.name);
      }
    });
    return Array.from(cats);
  }, [blogs]);

  // Filter Blogs
  const filteredBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(
        (blog) =>
          blog.category?.name?.toLowerCase() === activeCategory.toLowerCase()
      );

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative md:h-[84vh] sm:h-[70vh] h-[70vh] flex items-end justify-center overflow-hidden">
        <img
          src="/assets/art.png"
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.9)]"></div>

        <div className="relative z-20 text-center px-4 pb-12">
          <Heading level={1}>
            <div className="text-white">Search Here Blogs Articles</div>
          </Heading>
          <Paragraph>
            <p className="text-white max-w-2xl mx-auto leading-relaxed">
              Browse, explore, Request Information from Articles.
            </p>
          </Paragraph>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-[fadeIn_1s_ease-in_0.4s] mt-6">
            <button className="rounded-tl-[30px] flex justify-between items-center text-white w-full sm:w-[300px] rounded-tr-[30px] rounded-br-[30px] px-5 py-2 font-medium text-sm cursor-pointer bg-[#0B6D76]">
              <div>Search Now</div>
              <div><IoSearch /></div>
            </button>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <Container>
        <div className="banner-bottom-space bottom-session-space">
          <div className="flex flex-col justify-center items-center">
            <Heading level={3}>
              Latest <span className="text-[#0B6D76]">Articles</span>
            </Heading>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6 mt-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`${
                    activeCategory === category
                      ? 'bg-[#0B6D76] text-white'
                      : 'bg-white text-yellow-600'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-500 mb-4 text-center">
            Showing: {activeCategory} ({filteredBlogs.length} articles)
          </p>

          {/* Article Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center text-gray-400">Loading...</div>
            ) : paginatedBlogs.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400">No articles found.</div>
            ) : (
              paginatedBlogs.map((blog) => (
                <ArticleCard key={blog.id} article={blog} />
              ))
            )}
          </div>

          {/* Pagination */}
          {filteredBlogs.length > ARTICLES_PER_PAGE && (
            <div className="flex flex-col items-center mt-8 gap-2">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(endIndex, filteredBlogs.length)} of {filteredBlogs.length} articles
              </div>

              <div className="flex justify-center flex-wrap gap-2 md:gap-4">
                <Button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className={`${
                    currentPage === 1
                      ? 'bg-gray-200 text-yellow-600 cursor-not-allowed'
                      : 'bg-[#0B6D76] text-white hover:bg-[#095a62]'
                  }`}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <span className="py-2 px-4 text-sm text-[#0B6D76] font-medium">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  className={`${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-yellow-600 cursor-not-allowed'
                      : 'bg-[#0B6D76] text-white hover:bg-[#095a62]'
                  }`}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ArticlePage;
