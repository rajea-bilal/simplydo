import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTodo } from '@/context/todoContext';

const SearchForm = () => {
  const [searchInputVal, setSearchInputVal] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setSearchInputVal(inputValue);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchInputVal('');
    navigate(`/todo/search?query=${searchInputVal}`);
  };

  return (
    <div className="mb-4 mt-2">
      <form onSubmit={handleSubmit}>
        <div className="relative rounded-md border flex border-zinc-200 items-center justify-between p-2 focus-within:border-2 focus-within:border-[hsl(348,28%,75%)] ">
          <Input
            className="w-full pl-2 py-4 bg-[#ebdde0] rounded-md border-none outline-none focus-visible:ring-0"
            placeholder="search todos..."
            value={searchInputVal}
            onChange={handleChange}
          />

          <Search className="w-6 h-6 absolute right-5 top-1/2 transform -translate-y-1/2 text-zinc-500" />
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
