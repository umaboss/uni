'use client';

import Link from 'next/link';
import articles from '../../utils/articles';
import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import ArticleCard from '../molecules/ArticleCard';
import Button from '../atoms/Button';

const LatestArticles = () => {
  return (
    <section className="bg-white">
      <Container>
        <div className="text-center mb-12">
          <Heading level={3}>
            Latest <span className="text-[#0B6D76]">Articles</span>
          </Heading>
          <div className="xl:w-[70%] lg:w-[70%] md:w-[75%] sm:w-[90%] w-[100%] mx-auto">
            <Paragraph>
              Stay updated on universities and courses with our insightful articles. Explore academic trends, institution profiles, and career advice to guide your educational journey.
            </Paragraph>
          </div>
        </div>
        {/* Show only 3 articles */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
        <div className="flex justify-center cursor-pointer my-8">
          <Link href="/blog">
            <Button>View All</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default LatestArticles;
