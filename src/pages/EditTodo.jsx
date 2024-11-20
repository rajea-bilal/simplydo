import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';

import { useTodo } from '@/context/todoContext';
import PriorityFeature from '@/components/PriorityFeature';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ComplexityFeature from '@/components/ComplexityFeature';
import AddSubTask from '@/components/AddSubTask';
import AddTags from '@/components/AddTags';
import DatePicker from '@/components/DatePicker';

const parentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  subtasks: z.string().optional(),
});

const EditTodo = () => {
  const { todoArray, handleEditTask } = useTodo();
  let { id } = useParams();
  const displayingTodo = todoArray.find((singleTodo) => singleTodo.id === id);

  const [subtaskArray, setSubtaskArray] = useState(
    displayingTodo?.subtasks || []
  );
  const [tagArray, setTagArray] = useState(displayingTodo?.tag || []);
  const [dueDate, setDueDate] = useState(displayingTodo?.taskDue);
  const [priorityArray, setPriorityArray] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      name: `${index + 1}`,
      value: `priority${index + 1}`,
      selected: false,
    }))
  );
  const [priorityObj, setPriorityObj] = useState({
    priority: displayingTodo.priorityLevel.priority,
    value: displayingTodo.priorityLevel.value,
  });

  const [complexityObj, setComplexityObj] = useState({
    complexity: displayingTodo.complexityLevel.complexity,
    value: displayingTodo.complexityLevel.value,
  });

  const [complexityArray, setComplexityArray] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      name: `${index + 1}`,
      value: `complexity${index + 1}`,
      selected: false,
    }))
  );

  // manage the level chosen from priority and complexity
  const handleLevel = (name, value) => {
    const isPriority = priorityArray.some(
      (priority) => priority.value === value
    );
    if (isPriority) {
      const updatedArray = priorityArray.map((priority) =>
        priority.name === name
          ? { ...priority, selected: !priority.selected }
          : { ...priority, selected: false }
      );
      setPriorityArray(updatedArray);
      setPriorityObj({ priority: name, value: value });
    } else {
      const updatedArray = complexityArray.map((complexity) =>
        complexity.name === name
          ? { ...complexity, selected: !complexity.selected }
          : { ...complexity, selected: false }
      );
      setComplexityArray(updatedArray);
      setComplexityObj({ complexity: name, value: value });
    }
  };

  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate('/');
  };

  const handleParentSubmit = (data) => {
    const todo = {
      ...data,
      id: displayingTodo.id,
      tag: tagArray,
      subtasks: subtaskArray,
      taskDue: dueDate,
      priorityLevel: priorityObj,
      complexityLevel: complexityObj,
    };
    console.log(todo);
    handleEditTask(todo.id, todo);
    navigate('/');
  };

  let convertedPriority = parseInt(displayingTodo?.priorityLevel.priority);
  let convertedComplexity = parseInt(
    displayingTodo?.complexityLevel.complexity
  );

  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      name: displayingTodo?.name,
      description: displayingTodo?.description,
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = parentForm;

  return (
    <section className="rounded-md flex flex-col flex-wrap gap-10 max-w-sm md:max-w-md lg:max-w-xl p-3 mx-auto mt-10 mb-10 w-full">
      <div className="flex justify-center items-center w-full">
        {/* back btn */}
        <Button
          onClick={handleBackBtn}
          className="px-4 py-6 bg-[hsl(216,49%,70%)] hover:bg-[#7189ad"
        >
          <ArrowLeft
            style={{ width: '24px', height: '24px', color: 'inherit' }}
          />
        </Button>

        {/* page title */}
        <h2 className="flex-1 text-center text-3xl font-bold text-[#384456]">
          Add New to do
        </h2>
      </div>

      {/* Add to do form */}
      <Form {...parentForm}>
        <form
          onSubmit={handleSubmit(handleParentSubmit)}
          className="flex flex-col gap-10"
        >
          {/* name field */}
          <FormField
            control={parentForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 font-bold text-[1.2rem] text-[#384456]">
                  Task name
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-stone-400 text-[#384456] font-normal"
                    placeholder="Enter task name..."
                    {...field}
                  />
                </FormControl>

                <FormMessage>{errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* description field */}
          <FormField
            control={parentForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block mb-2 font-bold text-[1.2rem] text-[#353c40]">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-stone-400 text-stone-800"
                    placeholder="Describe your task..."
                    {...field}
                  />
                </FormControl>

                <FormMessage>{errors.description?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Due date feature */}
          <DatePicker dueDate={dueDate} setDueDate={setDueDate} />

          {/* Priority feature */}
          <FormItem>
            <FormLabel className="font-bold text-[1.2rem] text-[#384456]">
              Select Priority Level
            </FormLabel>
            <PriorityFeature
              priorityArray={priorityArray}
              handleLevel={handleLevel}
            />
          </FormItem>

          {/* Complexity feature */}
          <FormItem>
            <FormLabel className="font-bold text-[1.2rem] text-[#384456]">
              Select Complexity Level
            </FormLabel>
            <ComplexityFeature
              complexityArray={complexityArray}
              handleLevel={handleLevel}
            />
          </FormItem>

          <AddTags tagArray={tagArray} setTagArray={setTagArray} />

          <AddSubTask
            subtaskArray={subtaskArray}
            setSubtaskArray={setSubtaskArray}
          />

          <Button
            type="submit"
            className=" bg-[#7f9ac2] hover:bg-[#637897] w-full"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default EditTodo;
