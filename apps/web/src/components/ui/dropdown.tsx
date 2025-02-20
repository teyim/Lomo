/* eslint-disable no-unused-vars */
'use client';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'; // Adjust the import based on your setup
import { twMerge } from 'tailwind-merge';
import { useState } from 'react';

interface DropdownProps {
  placeholder: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  className?: string; // Allows passing custom styles
}

const Dropdown = ({ placeholder, options, onSelect, className }: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('all'); // Set default value as 'all'

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <Select
      onValueChange={handleSelect}
      value={selectedValue}
    >
      <SelectTrigger
        className={twMerge('w-[180px] ring-slate-900 ring-1 rounded-xl h-[40px]', className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          <SelectItem value="all">All</SelectItem> {/* Default 'All' option */}
          {options.map(option => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
