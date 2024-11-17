import React from 'react';
import japanese from '@/assets/japanese.jpg';
import housepainting from '@/assets/housepainting.jpg';
import nature from '@/assets/nature.jpg';

const Hero = () => {
  return (
    <div
      className=" mb-8 md:mb-8 h-[13rem] md:h-[17rem] overflow-hidden relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${japanese})`,
        backgroundSize: '108%', // Adjusts the zoom level
        backgroundPosition: 'center 50%', // Shows the top portion of the image
      }}
    ></div>
  );
};

//japanese - backgroundSize 109% backgroundPosition: center 50%
// housepainting - backgroundSize 100%, backgroundPosition: center 90%

export default Hero;
