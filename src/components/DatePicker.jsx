import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDatePicker from 'react-datepicker';
import { Input } from '@/components/ui/input';

const DatePicker = ({ dueDate, setDueDate }) => {
  const handleDate = (date) => {
    if (date) {
      setDueDate(date);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[1.2rem] text-[#384456] font-bold">
        Due Date & Time:
      </label>
      <ReactDatePicker
        selected={dueDate}
        onChange={(date) => handleDate(date)}
        showTimeSelect
        timeFormat="hh:mm aa"
        dateFormat="Pp"
        customInput={
          <Input
            className="placeholder:text-stone-400 text-stone-600"
            placeholder="Select Date"
          />
        }
        placeholderText="Select due date and time"
        className="w-full"
        popperClassName="custom-datepicker"
      />
    </div>
  );
};

export default DatePicker;
