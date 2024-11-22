import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useTodo } from '@/context/todoContext';

const FilterTagFeature = () => {
  const { checkedBox, totalTags, handleCheckbox } = useTodo();
  useEffect(() => {}, [totalTags]);
  return (
    <div className="border border-zinc-200 w-[190px] p-1 rounded-md focus:border-[#eadde0] focus:ring focus:ring-[#d0bcc1]">
      <DropdownMenu className="">
        <DropdownMenuTrigger className="w-full focus:bg-[#f0e7e9] ">
          <div className="flex items-center justify-between">
            <span className="text-sm ml-2 text-[#556782]">Tags</span>
            <ChevronDown className="w-4 h-4 stroke-[#556782]" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          {totalTags?.length === 0 && (
            <span className="text-sm text-[#556782]">No tags yet...</span>
          )}
          {totalTags?.map((tagItem) => (
            <DropdownMenuItem key={tagItem.id}>
              <Checkbox
                checked={checkedBox?.includes(tagItem.tagname)}
                onCheckedChange={() => handleCheckbox(tagItem.tagname)}
              />
              {tagItem.tagname}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterTagFeature;
