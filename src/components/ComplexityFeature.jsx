import React from 'react';

const ComplexityFeature = ({ complexityArray, handleLevel }) => {
  return (
    <div className=" w-full flex flex-wrap items-center gap-3">
      {complexityArray.map((option) => (
        <article
          onClick={() => handleLevel(option.name, option.value)}
          key={option.value}
          value={option.value}
          className={`bg-[#ced5d9] shadow-sm cursor-pointer flex-1 flex items-center justify-center min-h-11 rounded-full  hover:bg-[#aab5bc] hover:text-white ${option.selected ? 'priorityChosen' : ''}`}
        >
          {option.name}
        </article>
      ))}
    </div>
  );
};

export default ComplexityFeature;
