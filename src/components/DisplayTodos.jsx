import React from 'react';

import { useTodo } from '@/context/todoContext';
import TodoCard from './TodoCard';

const DisplayTodos = () => {
  const { todoArray } = useTodo();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-[2rem] md:mt-[3rem] max-w-7xl">
      {todoArray?.map((todo) => (
        <TodoCard key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default DisplayTodos;
