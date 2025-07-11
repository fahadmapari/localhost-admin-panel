import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

interface MultiSelectProps {
  options: string[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      onValueChange,
      placeholder = "Type to search and select items...",
      className,
      disabled,
      name,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [internalValue, setInternalValue] = React.useState<string[]>(
      defaultValue || []
    );
    const [selectAll, setSelectAll] = React.useState(false);

    // Use controlled value if provided, otherwise use internal state
    const selectedValues = value !== undefined ? value : internalValue;

    const handleUnselect = (item: string) => {
      const newValue = selectedValues.filter((i) => i !== item);
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleSelect = (item: string) => {
      let newValue: string[];
      if (selectedValues.includes(item)) {
        newValue = selectedValues.filter((i) => i !== item);
      } else {
        newValue = [...selectedValues, item];
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      setInputValue("");
    };

    const filteredOptions = options.filter((option) =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );

    React.useEffect(() => {
      if (selectAll) {
        setInternalValue(filteredOptions);
        onValueChange?.(filteredOptions);
      } else {
        setInternalValue([]);
        onValueChange?.([]);
      }
    }, [selectAll]);

    return (
      <div ref={ref} className={cn("w-full space-y-2", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pr-10"
                disabled={disabled}
                name={name}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                disabled={disabled}
                type="button"
              >
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search..."
                value={inputValue}
                onValueChange={setInputValue}
              />
              <CommandList>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  <div className="ml-2 my-2 flex gap-2 items-center">
                    <Checkbox
                      onCheckedChange={() => setSelectAll(!selectAll)}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="text-xs">Select All</span>
                  </div>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(option)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Selected Tags Section */}
        {selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-md border max-h-[100px] overflow-y-auto">
            {selectedValues.map((item) => {
              const option = options.find((opt) => opt === item);
              return (
                <Badge
                  variant="secondary"
                  key={item}
                  className="flex items-center gap-1"
                >
                  {option}
                  <button
                    type="button"
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(item);
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(item);
                    }}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
