import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { House, Meh } from 'lucide-react';
import { useTodo } from '@/context/todoContext';
import TodoCard from '@/components/TodoCard';
import { Separator } from '@/components/ui/separator';

const searchedTodo = () => {
  const [searchedTodo, setSearchedTodo] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query').toLowerCase();

  const { todoArray } = useTodo();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleSearchTodo = (query) => {
    const result = todoArray.filter((todo) => {
      const todoName = todo.name.toLowerCase();
      if (todoName.includes(query)) {
        return todo;
      }
    });
    console.log(result);
    setSearchedTodo(result);
  };
  useEffect(() => {
    handleSearchTodo(query);
  }, [todoArray]);

  return (
    <>
      <div className="flex flex-col gap-2 justify-center max-w-3xl mx-auto p-4">
        <h2 className="text-3xl font-bold text-[#434b50]">
          Search results for "{query}"
        </h2>
      </div>
      <Separator />
      <div className="h-full w-full px-6 max-w-7xl mt-[1rem]">
        <House
          onClick={handleHomeClick}
          className="w-11 h-11 bg-[#738691] hover:bg-[#5d717d] text-stone-100 rounded-lg p-2 cursor-pointer mb-[2rem]"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:mt-[3rem] max-w-7xl">
          {searchedTodo &&
            searchedTodo.map((todo) => <TodoCard key={todo.id} {...todo} />)}
        </div>

        {/* no results found */}
        <div className="flex justify-center">
          {searchedTodo.length === 0 && (
            <div className="flex flex-col gap-4 items-center">
              <Meh className="h-[6rem] w-[6rem] fill-yellow-400/60 stroke-slate-700" />
              <p className="text-xl">
                No results found, please try a different term.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default searchedTodo;
