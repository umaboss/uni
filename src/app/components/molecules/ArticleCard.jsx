'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import { slugify } from '../../utils/slugify';

const API_BASE_URL = 'http://localhost:5000';

const ArticleCard = ({ article }) => {
  const router = useRouter();
  
  let imageUrl = null;

  if (article.image) {
    console.log('Original image path:', article.image);
    if (article.image.startsWith('/')) {
      imageUrl = `${API_BASE_URL}${article.image}`;
    } else if (article.image.startsWith('http')) {
      imageUrl = article.image;
    }
    console.log('Constructed image URL:', imageUrl);
  }

  // Fallback excerpt
  const excerpt = article.excerpt || article.short_description || '';

  const handleArticleClick = () => {
    const slug = slugify(article.title);
    router.push(`/${slug}`);
  };

  return (
    <div 
      className="bg-white p-6 rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleArticleClick}
    >
      <div className="mb-4">
        <Heading level={5} className="mb-4">
          {article.title}
        </Heading>
      </div>
      {/* Article Image */}
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={article.title}
            width={352}
            height={200}
            className="w-full h-[200px] object-cover rounded-tl-[40px] rounded-tr-[40px] rounded-br-[40px]"
          />
        </div>
      )}

      {/* Article Title */}

      {/* Article Excerpt */}
      <div className=' flex flex-col  items-start'>
        <Paragraph className="mb-4">
          {excerpt}
        </Paragraph>

        {/* Read More Button */}
        <button 
          className="text-[#0B6D76] flex justify-end  cursor-pointer pt-[30px] hover:text-[#094d53] text-sm font-medium transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            handleArticleClick();
          }}
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
