import { useState, useEffect, useContext, createContext } from 'react';

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

  const [originalTodoArray, setOriginalTodoArray] = useState(() => {
    return JSON.parse(localStorage.getItem('todos')) || [];
  });

  const [checkedBox, setCheckedBox] = useState([]);
  const [totalTags, setTotalTags] = useState([]);

  const saveTodosToLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todoArray));
  };

  useEffect(() => {
    saveTodosToLocalStorage();
  }, [todoArray]);

  // add todos
  const handleAddTasks = (todo) => {
    const updatedOriginalTodoArray = [...originalTodoArray, todo];
    setOriginalTodoArray(updatedOriginalTodoArray);
    const updatedTodoArray = [...todoArray, todo];
    setTodoArray((prevTodos) => [
      ...prevTodos,
      {
        ...todo,
        originalIndex: prevTodos.length,
      },
    ]);
    console.log('Updated originalTodoArray:', updatedTodoArray);
  };

  //edit todos
  const handleEditTask = (id, updatedTodo) => {
    console.log('handleEditTask function ran', updatedTodo);
    setOriginalTodoArray((prev) =>
      prev.map((todo) => (todo.id === id ? { ...updatedTodo } : todo))
    );
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
    const updatedOriginalArray = originalTodoArray.map((todo) =>
      todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
    );

    const pinnedArray = updatedOriginalArray.filter(
      (todo) => todo.pinned === true
    );
    const unpinnedArray = updatedOriginalArray.filter(
      (todo) => todo.pinned === false
    );
    const sortedUnpinnedArray = unpinnedArray.sort(
      (a, b) => a.originalIndex - b.originalIndex
    );

    const updatedStateArray = [...pinnedArray, ...sortedUnpinnedArray];
    setOriginalTodoArray(updatedStateArray);
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
    setOriginalTodoArray((prev) => prev.filter((todo) => todo.id !== id));
    setTodoArray(filteredTodo);
  };

  // duplicate todo
  const cloneTodo = (id) => {
    // iterate through the state array, find the todo whose id matches the id provided

    const grabbedTodo = originalTodoArray.find((todo) => todo.id === id);

    const clonedObject = { ...grabbedTodo, id: uid() };
    setOriginalTodoArray((prev) => [...prev, clonedObject]);
    setTodoArray((prev) => [...prev, clonedObject]);
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

  // handle Tagging functionality
  const getTotalTags = () => {
    const allTags = originalTodoArray.map((todoObj) => todoObj.tag).flat();

    setTotalTags(allTags);
  };

  useEffect(() => {
    getTotalTags();
  }, [originalTodoArray]);

  const handleCheckbox = (tagname) => {
    if (!tagname) return;

    setCheckedBox((prev) =>
      prev.includes(tagname)
        ? prev.filter((tag) => tag !== tagname)
        : [...prev, tagname]
    );
  };

  useEffect(() => {
    if (checkedBox.length === 0) {
      setTodoArray(originalTodoArray);
      return;
    }

    console.log('checkedBox', checkedBox);
    const filteredArray = originalTodoArray.filter((todoObj) =>
      todoObj.tag.length === 0
        ? ''
        : todoObj.tag.some((tagObj) => checkedBox.includes(tagObj.tagname))
    );

    setTodoArray(filteredArray);
  }, [checkedBox, originalTodoArray]);

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
        checkedBox,
        totalTags,
        handleCheckbox,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
