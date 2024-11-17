import { useState, useEffect, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { compareAsc, compareDesc } from 'date-fns';
import { uid } from 'uid';

export const TodoContext = createContext();

// custom hook
export const useTodo = () => {
  const value = useContext(TodoContext);
  return value;
};

export const TodoProvider = ({ children }) => {
  const [todoArray, setTodoArray] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  const saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todoArray));
  };

  useEffect(() => {
    saveTodosToLocalStorage();
  }, [todoArray]);

  // add todos
  const handleAddTasks = (todo) => {
    const updatedTodoArray = [...todoArray, todo];
    setTodoArray((prevTodos) => [
      ...prevTodos,
      {
        ...todo,
        originalIndex: prevTodos.length,
      },
    ]);
    console.log(todoArray);
  };

  //edit todos
  const handleEditTask = (id, updatedTodo) => {
    console.log('handleEditTask function ran', updatedTodo);
    const updatedArray = todoArray.map((todo) =>
      todo.id === id ? { ...updatedTodo } : todo
    );
    console.log(updatedArray);
    setTodoArray(updatedArray);
  };

  // pin todo
  const pinTodo = (id) => {
    // toggle todo's pin
    // create pinnedArray and unpinnedArray using filter
    // organize unpinnedArray with sort method using originalIndex
    // organize state array by putting pinnedArray first and then unpinnedArray
    // set state array
    const togglePinArray = todoArray.map((todo) =>
      todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
    );

    const pinnedArray = togglePinArray.filter((todo) => todo.pinned === true);
    const unpinnedArray = togglePinArray.filter(
      (todo) => todo.pinned === false
    );
    const sortedUnpinnedArray = unpinnedArray.sort(
      (a, b) => a.originalIndex - b.originalIndex
    );

    const updatedStateArray = [...pinnedArray, ...sortedUnpinnedArray];
    setTodoArray(updatedStateArray);
  };
  // mark as completed
  const completeTask = (id) => {
    const updatedArray = todoArray.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoArray(updatedArray);
  };

  //remove todo
  const removeTodo = (id) => {
    const filteredTodo = todoArray.filter((task) => task.id !== id);
    setTodoArray(filteredTodo);
  };

  // duplicate todo
  const cloneTodo = (id) => {
    // iterate through the state array, find the todo whose id matches the id provided

    const grabbedTodo = todoArray.find((todo) => todo.id === id);

    const clonedObject = { ...grabbedTodo, id: uid() };
    const copiedStateArray = [...todoArray];
    copiedStateArray.push(clonedObject);
    console.log(copiedStateArray);
    setTodoArray(copiedStateArray);
  };

  // handle Sorting functionality
  const handleSortFunction = (value) => {
    if (value === 'aToZ') {
      const alphabeticallyOrdered = [...todoArray].sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setTodoArray(alphabeticallyOrdered);
    } else if (value === 'zToA') {
      const reversed = [...todoArray].sort((a, b) =>
        b.name.localeCompare(a.name)
      );

      setTodoArray(reversed);
    } else if (value === 'highPriority') {
      const highPriorityOrder = [...todoArray].sort(
        (a, b) =>
          parseInt(b.priorityLevel.priority) -
          parseInt(a.priorityLevel.priority)
      );

      setTodoArray(highPriorityOrder);
    } else if (value === 'lowPriority') {
      const lowPriorityOrder = [...todoArray].sort(
        (a, b) =>
          parseInt(a.priorityLevel.priority) -
          parseInt(b.priorityLevel.priority)
      );

      setTodoArray(lowPriorityOrder);
    } else if (value === 'highComplexity') {
      const highComplexityOrder = [...todoArray].sort(
        (a, b) =>
          parseInt(b.complexityLevel.complexity) -
          parseInt(a.complexityLevel.complexity)
      );

      setTodoArray(highComplexityOrder);
    } else if (value === 'lowComplexity') {
      const lowComplexityOrder = [...todoArray].sort(
        (a, b) =>
          parseInt(a.complexityLevel.complexity) -
          parseInt(b.complexityLevel.complexity)
      );

      setTodoArray(lowComplexityOrder);
    } else if (value === 'mostUrgent') {
      const urgentOrdered = [...todoArray].sort((a, b) =>
        compareAsc(new Date(a.taskDue), new Date(b.taskDue))
      );

      setTodoArray(urgentOrdered);
    } else if (value === 'leastUrgent') {
      const leastUrgentOrdered = [...todoArray].sort((a, b) =>
        compareDesc(new Date(a.taskDue), new Date(b.taskDue))
      );

      setTodoArray(leastUrgentOrdered);
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todoArray,
        setTodoArray,
        handleAddTasks,
        handleEditTask,
        pinTodo,
        completeTask,
        removeTodo,
        cloneTodo,
        handleSortFunction,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
