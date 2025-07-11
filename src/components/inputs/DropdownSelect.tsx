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

interface Props {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  options: string[];
  label: string;
}

const DropdownSelect = ({
  value,
  defaultValue,
  onChange,
  options,
  label,
}: Props) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full capitalize">
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
