import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  options: string[];
  label: string;
  className?: string;
  disabled?: boolean;
}

const DropdownSelect = ({
  value,
  defaultValue,
  onChange,
  options,
  label,
  className,
  disabled = false,
}: Props) => {
  return (
    <Select
      value={value}
      onValueChange={onChange}
      defaultValue={defaultValue}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full capitalize", className)}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {options.map((op) => (
            <SelectItem className="capitalize" value={op} key={op}>
              {op}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DropdownSelect;
