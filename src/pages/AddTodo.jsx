import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
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

const AddTodo = () => {
  const { handleAddTasks } = useTodo();

  const [subtaskArray, setSubtaskArray] = useState([]);
  const [tagArray, setTagArray] = useState([]);
  const [dueDate, setDueDate] = useState('');
  const [priorityArray, setPriorityArray] = useState([
    { name: '1', value: 'priority1', selected: false },
    { name: '2', value: 'priority2', selected: false },
    { name: '3', value: 'priority3', selected: false },
    { name: '4', value: 'priority4', selected: false },
    { name: '5', value: 'priority5', selected: false },
    { name: '6', value: 'priority6', selected: false },
    { name: '7', value: 'priority7', selected: false },
    { name: '8', value: 'priority8', selected: false },
    { name: '9', value: 'priority9', selected: false },
    { name: '10', value: 'priority10', selected: false },
  ]);
  const [priorityObj, setPriorityObj] = useState({});
  const [complexityObj, setComplexityObj] = useState(0);

  const [complexityArray, setComplexityArray] = useState([
    { name: '1', value: 'complexity1', selected: false },
    { name: '2', value: 'complexity2', selected: false },
    { name: '3', value: 'complexity3', selected: false },
    { name: '4', value: 'complexity4', selected: false },
    { name: '5', value: 'complexity5', selected: false },
    { name: '6', value: 'complexity6', selected: false },
    { name: '7', value: 'complexity7', selected: false },
    { name: '8', value: 'complexity8', selected: false },
    { name: '9', value: 'complexity9', selected: false },
    { name: '10', value: 'complexity10', selected: false },
  ]);

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

  const parentForm = useForm({
    resolver: zodResolver(parentSchema),
    defaultValues: {
      name: '', // Initialize with an empty string
      description: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = parentForm;

  const handleBackBtn = () => {
    navigate('/');
  };

  const handleParentSubmit = (data) => {
    const todo = {
      ...data,
      id: uid(),
      tag: tagArray,
      subtasks: subtaskArray,
      taskDue: dueDate,
      priorityLevel: priorityObj,
      complexityLevel: complexityObj,
      completed: false,
      pinned: false,
    };
    console.log(todo);
    handleAddTasks(todo);
    navigate('/');
  };

  return (
    <section className="rounded-md flex flex-col flex-wrap gap-10 max-w-xl mx-auto mt-10 mb-10 w-full">
      <div className="flex justify-center items-center w-full">
        {/* back btn */}
        <Button
          onClick={handleBackBtn}
          className="px-4 py-6 bg-[#738691] hover:bg-[#5d717d]"
        >
          <ArrowLeft
            style={{ width: '24px', height: '24px', color: 'inherit' }}
          />
        </Button>

        {/* page title */}
        <h2 className="flex-1 text-center text-[#353c40] text-4xl font-bold">
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
                <FormLabel className="block mb-2 font-bold text-[1.2rem] text-[#353c40]">
                  Task name
                </FormLabel>
                <FormControl>
                  <Input
                    className="placeholder:text-stone-400 text-[#353c40] font-normal"
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
            <FormLabel className="font-bold text-[1.2rem] text-[#353c40]">
              Select Priority Level
            </FormLabel>
            <PriorityFeature
              priorityArray={priorityArray}
              handleLevel={handleLevel}
            />
          </FormItem>

          {/* Complexity feature */}
          <FormItem>
            <FormLabel className="font-bold text-[1.2rem] text-[#353c40]">
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
            className="bg-[#738691] hover:bg-[#5d717d] w-full"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default AddTodo;
