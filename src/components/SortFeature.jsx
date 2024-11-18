import React from 'react';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTodo } from '@/context/todoContext';

const SortFeature = () => {
  const { handleSortFunction } = useTodo();

  return (
    <Select
      onValueChange={handleSortFunction}
      className="focus-within:ring focus-within:ring-blue-500"
    >
      <SelectTrigger className="w-[190px] focus:bg-[#f0e7e9] focus:border-[#eadde0] focus:ring focus:ring-[#d0bcc1]">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <div className="flex flex-col gap-1">
          <article className="flex gap-2">
            <SelectItem value="aToZ" className="cursor-pointer ">
              name (A to Z)
            </SelectItem>
            <SelectItem className="cursor-pointer" value="zToA">
              name (Z to A)
            </SelectItem>
          </article>
          <Separator />
          <article className="flex gap-3">
            <SelectItem className="cursor-pointer" value="mostUrgent">
              most urgent
            </SelectItem>
            <SelectItem className="cursor-pointer" value="leastUrgent">
              least urgent
            </SelectItem>
          </article>
          <Separator />
          <article className="flex gap-3 flex-1">
            <SelectItem className="cursor-pointer " value="highPriority">
              high priority
            </SelectItem>
            <SelectItem className="cursor-pointer" value="lowPriority">
              low priority
            </SelectItem>
          </article>
          <Separator />
          <article className="flex gap-2">
            <SelectItem className="cursor-pointer" value="highComplexity">
              high complexity
            </SelectItem>
            <SelectItem className="cursor-pointer" value="lowComplexity">
              low complexity
            </SelectItem>
          </article>
        </div>
      </SelectContent>
    </Select>
  );
};

export default SortFeature;
