import React from 'react';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useNavigate } from 'react-router-dom';
import {
  Plus,
  CirclePower,
  Gem,
  Microscope,
  Calendar,
  Puzzle,
  Sticker,
} from 'lucide-react';
import SortFeature from '@/components/SortFeature';
import { Button } from '@/components/ui/button';
import SearchForm from '../components/SearchForm';
import DisplayTodos from '@/components/DisplayTodos';
import { useTodo } from '@/context/todoContext';
import { Separator } from '@/components/ui/separator';

const Home = () => {
  const [powerTodoItem, setPowerTodoItem] = useState();
  const { todoArray } = useTodo();
  const navigate = useNavigate();

  const handleAddTodo = () => {
    navigate('/todo/add');
  };

  const handlePowerMode = () => {
    //Can use the power mode feature which ads up the complexity and priority values and sorts the list from highest value to lowest.
    let powerTodo;
    let highestImportance = 0;
    for (let i = 0; i < todoArray.length; i++) {
      let priority = parseInt(todoArray[i].priorityLevel.priority);
      let complexity = parseInt(todoArray[i].complexityLevel.complexity);

      if (priority + complexity > highestImportance) {
        highestImportance = priority + complexity;

        powerTodo = todoArray[i];
      }
    }

    setPowerTodoItem(powerTodo);
  };

  return (
    <div className="mb-[5rem]">
      <header className="rounded-md flex flex-col gap-2 justify-center max-w-3xl mx-auto mt-4 p-4">
        <div className="flex justify-center gap-6">
          <Button
            className="text-lg py-6 bg-[hsl(216,49%,70%)] hover:bg-[#7189ad] font-semibold"
            onClick={handleAddTodo}
          >
            <Plus style={{ width: '24px', height: '24px', color: 'inherit' }} />
            Add Item
          </Button>

          <Dialog>
            <DialogTrigger
              onClick={handlePowerMode}
              className="flex gap-2 items-center bg-[hsl(216,49%,70%)] hover:bg-[#7189ad] font-semibold text-lg p-2 px-4 text-stone-50 rounded-md"
            >
              {' '}
              <CirclePower
                style={{ width: '24px', height: '24px', color: 'inherit' }}
              />
              Power Mode
            </DialogTrigger>
            <DialogContent className="max-w-sm sm:max-w-md md:max-w-lg h-[24rem] rounded-lg ">
              <DialogHeader>
                <DialogTitle className="text-4xl mb-2 text-[#47566c]">
                  {powerTodoItem?.name}
                </DialogTitle>
                <DialogDescription>
                  {/* This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers. */}

                  <Separator />
                  <h2 className="text-xl text-[#6a777f] px-2 py-1">
                    {powerTodoItem?.description}
                  </h2>
                  <Separator />

                  <div className="flex-1 flex flex-col gap-4 h-full w-full mt-6">
                    <article className="flex items-center gap-2">
                      <Calendar className="w-6 h-6 text-[#47566c]" />
                      <p className="text-lg text-[#6a777f]">Due:</p>
                      <span
                        className={`${powerTodoItem?.completed ? 'line-through' : ''} text-[1rem] text-[#434b50]`}
                      >
                        {powerTodoItem?.taskDue
                          ? format(
                              powerTodoItem?.taskDue,
                              'EEE, MMM dd yyyy, h:mm aa'
                            )
                          : 'N/A'}
                      </span>
                    </article>

                    <article className="flex items-center gap-2">
                      <Gem className="w-6 h-6 text-[#47566c]" />

                      {powerTodoItem?.priorityLevel.priority >= 1 &&
                        powerTodoItem?.priorityLevel.priority <= 3 && (
                          <>
                            <p className="text-lg text-[#6a777f]">Priority: </p>
                            <span className="text-[1rem] text-[#434b50]">
                              Low ({powerTodoItem?.priorityLevel.priority}/10)
                            </span>
                          </>
                        )}

                      {powerTodoItem?.priorityLevel.priority >= 4 &&
                        powerTodoItem?.priorityLevel.priority <= 6 && (
                          <>
                            <p className="text-lg text-[#6a777f]">Priority:</p>
                            <span className="text-[1rem] text-[#434b50]">
                              Medium ({powerTodoItem?.priorityLevel.priority}
                              /10)
                            </span>
                          </>
                        )}
                      {powerTodoItem?.priorityLevel.priority >= 7 && (
                        <>
                          <p className="text-lg text-[#6a777f]">Priority: </p>
                          <span className="text-[1rem] text-[#434b50]">
                            High ({powerTodoItem?.priorityLevel.priority}/10)
                          </span>
                        </>
                      )}
                    </article>

                    <article className="flex items-center gap-2">
                      <Microscope className="w-6 h-6 text-[#47566c]" />

                      {powerTodoItem?.complexityLevel.complexity >= 1 &&
                        powerTodoItem?.complexityLevel.complexity <= 3 && (
                          <>
                            <p className="text-lg text-[#6a777f]">
                              Complexity:
                            </p>
                            <span className="text-[1rem] text-[#434b50]">
                              Low ({powerTodoItem?.complexityLevel.complexity}
                              /10)
                            </span>
                          </>
                        )}
                      {powerTodoItem?.complexityLevel.complexity >= 4 &&
                        powerTodoItem?.complexityLevel.complexity <= 6 && (
                          <>
                            <p className="text-lg text-[#6a777f]">
                              Complexity:
                            </p>
                            <span className="text-[1rem] text-[#47566c] ">
                              Medium (
                              {powerTodoItem?.complexityLevel.complexity}/10)
                            </span>
                          </>
                        )}
                      {powerTodoItem?.complexityLevel.complexity >= 7 && (
                        <>
                          <p className="text-lg text-[#6a777f]">Complexity:</p>
                          <span className="text-[1rem] text-[#434b50] ">
                            High ({powerTodoItem?.complexityLevel.complexity}
                            /10)
                          </span>
                        </>
                      )}
                    </article>

                    <article className="flex items-center gap-2">
                      <Puzzle className="w-6 h-6 text-[#47566c]" />
                      <p className="text-lg text-[#6a777f]">Subtasks:</p>
                      <span className="text-[1rem] text-[#434b50]">
                        {powerTodoItem?.subtasks.length}
                      </span>
                    </article>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <SearchForm className="w-full" />
        <SortFeature />
      </header>

      <main className="h-full py-4 px-6">
        {todoArray?.length > 0 && <DisplayTodos />}
        {todoArray?.length === 0 && (
          <div className="text-center font-semibold text-[#98b3dc] flex flex-col gap-4 items-center justify-center">
            <Sticker className="w-16 h-16 stroke-[#afc4e4]" />
            <p className="text-xl">
              Start small, think big—your first task awaits...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
