import React from 'react';

const PriorityFeature = ({ priorityArray, handleLevel }) => {
  return (
    <div className=" w-full flex flex-wrap items-center gap-3">
      {priorityArray.map((option) => (
        <article
          onClick={() => handleLevel(option.name, option.value)}
          key={option.value}
          value={option.value}
          className={`bg-[#d1ddef] shadow-sm cursor-pointer flex-1 flex items-center justify-center min-h-11 rounded-full hover:bg-[#bbcde8] hover:text-white ${option.selected ? 'priorityChosen' : ''}`}
        >
          {option.name}
        </article>
      ))}
    </div>
  );
};

export default PriorityFeature;
