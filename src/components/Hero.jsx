import React, { useState } from 'react';
import japanese from '@/assets/japanese.jpg';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
      className=" mb-8 md:mb-8 h-[13rem] md:h-[17rem] overflow-hidden relative bg-cover bg-center"
      // style={{
      //   backgroundImage: `url(${japanese})`,
      //   backgroundSize: '108%', // Adjusts the zoom level
      //   backgroundPosition: 'center 50%', // Shows the top portion of the image
      // }}
    >
      <img
        src={japanese}
        alt="Hero Background"
        className="w-full h-full object-cover transform scale-110"
        loading="lazy" // Lazy loads the image
      />
    </div>
  );
};

export default Hero;
