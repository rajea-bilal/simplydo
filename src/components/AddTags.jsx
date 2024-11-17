import React from 'react';
import { useState } from 'react';
import { uid } from 'uid';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AddTags = ({ tagArray, setTagArray }) => {
  const [inputVal, setInputVal] = useState('');

  const generateBgColor = () => {
    // to generate subtle colors, added a higher base number
    const red = Math.floor(Math.random() * 115) + 140;
    const blue = Math.floor(Math.random() * 115) + 140;
    const green = Math.floor(Math.random() * 115) + 140;

    const randomBG = `rgb(${red},${blue},${green})`;

    return randomBG;
  };

  const handleChange = (e) => {
    const capturedValue = e.target.value;
    setInputVal(capturedValue);
  };

  // capture 'Enter' key to add tags
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitTag();
    }
  };
  const handleSubmitTag = () => {
    const randomBgColor = generateBgColor();
    if (!inputVal) {
      return;
    }
    const newTag = { tagname: inputVal, id: uid(), bgColor: randomBgColor };

    setTagArray((prevTagArray) => [...prevTagArray, newTag]);

    setInputVal('');
  };

  const handleRemoveTag = (id) => {
    const filteredTagArray = tagArray.filter((tag) => tag.id !== id);
    setTagArray(filteredTagArray);
  };

  return (
    <section className="">
      <h3 className="block mb-2 font-bold text-[1.2rem] text-[#353c40]">
        Tags:
      </h3>

      <div className="border border-stone-300 flex rounded-lg">
        <Input
          placeholder="Enter relevant tags..."
          className="pr-10 placeholder:text-stone-400 text-stone-800 border-none"
          value={inputVal}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <Button
          className="bg-[#85959f] hover:bg-[#738691]"
          onClick={handleSubmitTag}
        >
          <Plus
            style={{ height: '1.5rem', width: '1.5rem' }}
            className="h-6 w-6 text-stone-100"
          />
        </Button>
      </div>

      {/* Display subtasks */}
      <div
        className={`border border-stone-300 mt-4 text-stone-400 p-4 text-sm w-full rounded-l-full rounded-r-full mx-auto flex flex-wrap gap-4 `}
      >
        <p>{tagArray?.length === 0 && 'No sub tasks yet...'}</p>

        {tagArray?.length > 0 &&
          tagArray.map((item) => (
            <article
              onClick={() => handleRemoveTag(item.id)}
              style={{ backgroundColor: item.bgColor }}
              className={` shadow-sm py-2 px-4 text-stone-800 text-sm flex justify-between items-center gap-1 rounded-l-full rounded-r-full transform transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer`}
              key={item.id}
            >
              {item.tagname}

              <X className="text-black h-5 w-5 cursor-pointer" />
            </article>
          ))}
      </div>
    </section>
  );
};

export default AddTags;
