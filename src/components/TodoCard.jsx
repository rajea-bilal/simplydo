import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTodo } from '@/context/todoContext';

import {
  Gem,
  Microscope,
  Calendar,
  Puzzle,
  Trash2,
  SquarePen,
  CircleCheckBig,
  EllipsisVertical,
  Copy,
  Pin,
} from 'lucide-react';
import { format, isToday, differenceInDays } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProgressBar from '@/components/ProgressBar';

const TodoCard = ({
  id,
  pinned,
  complexityLevel,
  priorityLevel,
  tag,
  subtasks,
  name,
  description,
  taskDue,
  completed,
}) => {
  const [isOpen, setIsOpen] = useState();
  const { pinTodo, completeTask, removeTodo, cloneTodo } = useTodo();

  let convertedPriority = parseInt(priorityLevel.priority);
  let convertedComplexity = parseInt(complexityLevel.complexity);

  // used date-fns library to format the date to appear as Sat, Nov 09 2024, 11:00 AM
  let formattedDate;
  if (taskDue) {
    formattedDate = format(taskDue, 'EEE, MMM dd yyyy, h:mm aa');
  } else {
    formattedDate = '';
  }

  const navigate = useNavigate();

  const handleEditClick = (id) => {
    console.log(id);
    navigate(`/todo/add/${id}`);
    // user clicks on edit button, handleEditClick function fires
    // navigates back to /add/todos/:id
    // iterate over the todo array, find the todo that matches the id
    // pre-populate all the fields with values from the todo object
  };
  // hsla(204,24%,68%,60%)
  return (
    <Card
      className={` bg-white ${completed ? 'bg-[#dde6f3]' : 'bg-white'} shadow-lg hover:ring-4 hover:ring-[hsl(328,10%,70%)] transition duration-30`}
    >
      <CardHeader
        className={`${pinned ? 'bg-[hsl(137,35%,72%)]' : ''} flex justify-between p-4 rounded-tl-lg rounded-tr-lg `}
      >
        <div className="flex-1">
          <CardTitle className="text-lg text-[#434b50]">{name}</CardTitle>
          {description && (
            <CardDescription className="text-[#6a777f]">
              {description}
            </CardDescription>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <Pin
            onClick={() => pinTodo(id)}
            className={`text-stone-600 cursor-pointer ${pinned ? 'fill-[hsl(137,35%,52%)] stroke-[hsl(137,35%,42%)]' : ''} transition-all ease-in-out duration-300`}
          />
          <CircleCheckBig
            onClick={() => completeTask(id)}
            className={`text-stone-600 cursor-pointer ${completed ? 'text-[hsl(137,35%,42%)]' : ''}  transition-all ease-in-out duration-300`}
          />

          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVertical className="text-stone-600 cursor-pointer hover:text-stone-900 transition-all ease-in-out duration-300 " />
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="flex flex-col gap-2">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handleEditClick(id)}
                >
                  <div className="flex justify-between w-full">
                    <p className="text-stone-700">Edit</p>
                    <SquarePen className="text-stone-500 w-5 h-5 hover:text-stone-600 transition-all ease-in-out duration-300" />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => cloneTodo(id)}
                >
                  <div className="flex justify-between w-full">
                    <p className="text-stone-700">Clone</p>
                    <Copy className="text-stone-500 cursor-pointer w-5 h-5 hover:text-stone-600 transition-all ease-in-out duration-300" />
                  </div>
                </DropdownMenuItem>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <div className="flex justify-between w-full">
                        <p className="text-stone-700">Delete</p>
                        <Trash2 className="text-stone-500 cursor-pointer w-5 h-5 hover:text-stone-600 transition-all ease-in-out duration-300" />
                      </div>
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your data.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          removeTodo(id);
                          setIsOpen(false);
                        }}
                      >
                        Confirm
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className=" flex flex-col w-full gap-3 px-5 py-2">
        {/* Todo card icons */}
        <div className="flex items-center">
          <div className="flex-1 flex flex-col gap-2 h-full w-full">
            <article className="flex items-center gap-2 mt-2">
              <Calendar className="w-4 h-4 text-[#6a777f]" />
              <span className="text-md text-[#9daab2] whitespace-nowrap ">
                Due:
              </span>
              <span
                className={`${completed ? 'line-through' : ''} ${isToday(new Date(taskDue)) ? 'text-red-700' : differenceInDays(new Date(taskDue), new Date()) < 3 ? 'text-orange-400' : 'text-[#434b50]'} text-sm text-[#434b50] whitespace-nowrap`}
              >
                {formattedDate ? formattedDate : 'N/A'}
              </span>
            </article>

            <article className="flex items-center gap-2">
              <Gem className="w-4 h-4 text-[#6a777f]" />

              {convertedPriority >= 1 && convertedPriority <= 3 && (
                <>
                  <p className="text-md text-[#9daab2]">Priority: </p>
                  <span className="text-sm text-[#434b50]">
                    Low ({convertedPriority}/10)
                  </span>
                </>
              )}

              {convertedPriority >= 4 && convertedPriority <= 6 && (
                <>
                  <p className="text-md text-[#9daab2]">Priority:</p>
                  <span className="text-sm text-[#434b50]">
                    Medium ({convertedPriority}/10)
                  </span>
                </>
              )}
              {convertedPriority >= 7 && (
                <>
                  <p className="text-md text-[#9daab2]">Priority: </p>
                  <span className="text-sm text-[#434b50]">
                    High ({convertedPriority}/10)
                  </span>
                </>
              )}
            </article>

            <article className="flex items-center gap-2">
              <Microscope className="w-4 h-4 text-[#6a777f]" />

              {convertedComplexity >= 1 && convertedComplexity <= 3 && (
                <>
                  <p className="text-md text-[#9daab2]">Complexity:</p>
                  <span className="text-sm text-[#434b50]">
                    Low ({convertedComplexity}/10)
                  </span>
                </>
              )}
              {convertedComplexity >= 4 && convertedComplexity <= 6 && (
                <>
                  <p className="text-md text-[#9daab2]">Complexity:</p>
                  <span className="text-sm text-[#434b50]">
                    Medium ({convertedComplexity}/10)
                  </span>
                </>
              )}
              {convertedComplexity >= 7 && (
                <>
                  <p className="text-md text-[#9daab2]">Complexity:</p>
                  <span className="text-sm text-[#434b50]">
                    High ({convertedComplexity}/10)
                  </span>
                </>
              )}
            </article>

            <article className="flex items-center gap-2">
              <Puzzle className="w-4 h-4 text-[#6a777f]" />
              <p className="text-md text-[#9daab2]">Subtasks:</p>
              <span className="text-sm text-[#434b50]">{subtasks.length}</span>
            </article>
          </div>

          {subtasks?.length > 0 && <ProgressBar subtasks={subtasks} />}
          {/* <ProgressBar subtasks={subtasks} /> */}
        </div>

        {completed && (
          <p className="text-xs italic text-stone-700 font-light">
            Task completed on {format(new Date(), 'PPp')}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <div className="flex gap-2 w-full flex-wrap ">
          {tag.map((tagItem) => (
            <article
              style={{ backgroundColor: `${tagItem.bgColor}` }}
              key={tagItem.id}
              className="p-1 px-2 rounded-full text-xs"
            >
              {tagItem.tagname}
            </article>
          ))}
        </div>
        {/* {completed && <p>Completed today at {format(new Date())}</p>} */}
      </CardFooter>
    </Card>
  );
};

export default TodoCard;
