import React from 'react';
import { useState } from 'react';
import { uid } from 'uid';
import { Plus, CircleCheck, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddSubTask = ({ subtaskArray, setSubtaskArray }) => {
  const [inputVal, setInputVal] = useState('');

  const handleChange = (e) => {
    const capturedValue = e.target.value;
    setInputVal(capturedValue);
  };

  // capture 'Enter' key to add tags
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubtask();
    }
  };

  // add subtasks
  const handleAddSubtask = () => {
    if (!inputVal) return;
    const subtaskFromInput = inputVal.trim();
    const newSubtask = {
      subtask: subtaskFromInput,
      id: uid(),
      completed: false,
    };
    setSubtaskArray((prevSubtaskArray) => [...prevSubtaskArray, newSubtask]);
    setInputVal('');
  };

  //handle completion
  const handleSubtaskCompletion = (id) => {
    console.log(id);
    const updatedSubtaskArray = subtaskArray.map((subtask) =>
      subtask.id === id
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    console.log(updatedSubtaskArray);
    setSubtaskArray(updatedSubtaskArray);
  };
  // remove subtasks
  const handleRemoveSubtask = (id) => {
    const filteredSubtaskArray = subtaskArray.filter((task) => task.id !== id);
    setSubtaskArray(filteredSubtaskArray);
  };

  return (
    <section className="">
      <h3 className="block mb-2 font-bold text-[1.2rem] text-[#353c40]">
        Add subtasks
      </h3>

      <div className="flex border border-stone-300 rounded-lg">
        <Input
          placeholder="Break task into smaller subtasks..."
          className="placeholder:text-stone-400 pr-10 text-stone-800 border-none"
          onChange={handleChange}
          value={inputVal}
          onKeyDown={handleKeyDown}
        />

        <Button
          className="bg-[#85959f] hover:bg-[#738691]"
          onClick={handleAddSubtask}
        >
          <Plus
            style={{ height: '1.5rem', width: '1.5rem' }}
            className="h-10 w-10 text-stone-100"
          />
        </Button>
      </div>

      {/* Display subtasks */}
      <div
        className={`${subtaskArray.length < 1 ? 'border border-stone-300 mt-4' : ''} py-2 px-4 text-stone-400 text-sm rounded-l-full rounded-r-full w-full mx-auto flex flex-col gap-2`}
      >
        <p>{subtaskArray?.length === 0 && 'No sub tasks yet...'}</p>

        {subtaskArray?.length > 0 &&
          subtaskArray.map((item) => (
            <article
              className={`border border-stone-300 ${item.completed ? 'line-through' : ''} py-2 px-4 text-stone-600 text-sm flex justify-between items-center rounded-l-full rounded-r-full w-full mx-auto`}
              key={item.id}
            >
              {item.subtask}
              <div className="flex gap-2">
                <CircleCheck
                  onClick={() => handleSubtaskCompletion(item.id)}
                  className={`text-[#bcc499] h-7 w-7 hover:text-[#9ba85c] cursor-pointer`}
                />
                <CircleX
                  onClick={() => handleRemoveSubtask(item.id)}
                  className="text-[#d27f50] h-7 w-7 hover:text-[#aa5a2f] cursor-pointer"
                />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default AddSubTask;
