'use client';

import { FaEnvelope, FaUser } from 'react-icons/fa';
import Container from '../../components/atoms/Container';
import Heading from '../../components/atoms/Heading';
import { Input } from '../free-consultation/page';
import Button from '../../components/atoms/Button';

const TrackApplication = () => {
  return (
    <div className="banner-bottom-space bottom-session-space text-center bg-white">
     <div className="pt-[80px]"> <Heading level={3}>
        Track <span className="text-[#0B6D76] font-medium"> Application Status</span>
      </Heading></div>

      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center pb-[40px] gap-[20px] md:gap-[25px] mt-8">
          <Input
            name={'Enter Full Name'}
            icon={<FaUser />}
            placeholder={'Enter Full Name'}
          />
          <Input
            name={'Enter Passport Number'}
            icon={<FaEnvelope />}
            placeholder={'Enter Passport Number'}
          />
          <Button className="w-full md:w-auto">Track</Button>
        </div>
          <img src="/assets/track.png" alt="" className='md:block sm:hidden hidden'/>
      </Container>
    </div>
  );
};

export default TrackApplication;
