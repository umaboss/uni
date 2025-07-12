
import UniversityCard from '../atoms/UniversityCard';
import Container from '../atoms/Container';
import Heading from '../atoms/Heading';
import Paragraph from '../atoms/Paragraph';
import { universities } from '../../utils/universities';

const PopularUniversities = () => {
  // Use the first 3 universities from our data
  const popularUniversities = universities.slice(0, 3);

  return (
    <section className="bg-white">
      <Container>
        <div>
          <div className="text-center mb-16">
            <Heading level={3}>
              Popular <span className="text-[#0B6D76]">Universities</span>
            </Heading>
            <p className="max-w-2xl mx-auto">
              <Paragraph>
                Explore world-renowned universities offering top-tier education,
                diverse programs, and vibrant campus life. Choose your path to
                success at prestigious institutions.
              </Paragraph>
            </p>
          </div>
          <div className="relative flex xl:justify-between lg:justify-between md:justify-center justify-center sm:justify-center items-center gap-10 flex-wrap md:flex-nowrap">
            {popularUniversities.map((university, index) => (
              <div key={university.id} className="flex flex-col items-center relative">
                <UniversityCard
                  name={university.name}
                  image={university.image}
                  id={university.id}
                  slug={university.slug}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
                {/* Simple custom image between cards (not dot svg) */}
                {index < popularUniversities.length - 1 && (
                  <img
                    src="/assets/dot.png"
                    alt="connector"
                    className="mt-4 md:mt-0 md:absolute md:top-1/2 md:left-full md:translate-x-4 w-[100%] h-auto hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PopularUniversities;
