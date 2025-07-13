import * as React from "react";
import { Check, ChevronsUpDown, X, CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

interface MultiDateSelectProps {
  value?: Date[];
  defaultValue?: Date[];
  onValueChange?: (value: Date[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  showPresets?: boolean;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isSameDay = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

const getDatePresets = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);

  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return [
    { label: "Today", date: today },
    { label: "Tomorrow", date: tomorrow },
    { label: "Next Week", date: nextWeek },
    { label: "Next Month", date: nextMonth },
  ];
};

export const MultiDateSelect = React.forwardRef<
  HTMLDivElement,
  MultiDateSelectProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      placeholder = "Select dates...",
      className,
      disabled,
      name,
      minDate,
      maxDate,
      disabledDates = [],
      showPresets = true,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const [internalValue, setInternalValue] = React.useState<Date[]>(
      defaultValue || []
    );

    // Use controlled value if provided, otherwise use internal state
    const selectedDates = value !== undefined ? value : internalValue;

    const handleUnselect = (dateToRemove: Date) => {
      const newValue = selectedDates.filter(
        (date) => !isSameDay(date, dateToRemove)
      );
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handleDateSelect = (date: Date | undefined) => {
      if (!date) return;

      let newValue: Date[];
      const existingIndex = selectedDates.findIndex((selectedDate) =>
        isSameDay(selectedDate, date)
      );

      if (existingIndex >= 0) {
        newValue = selectedDates.filter((_, index) => index !== existingIndex);
      } else {
        newValue = [...selectedDates, date];
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const handlePresetSelect = (presetDate: Date) => {
      const isSelected = selectedDates.some((date) =>
        isSameDay(date, presetDate)
      );

      let newValue: Date[];
      if (isSelected) {
        newValue = selectedDates.filter((date) => !isSameDay(date, presetDate));
      } else {
        newValue = [...selectedDates, presetDate];
      }

      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const clearAll = () => {
      const newValue: Date[] = [];
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return disabledDates.some((disabledDate) =>
        isSameDay(disabledDate, date)
      );
    };

    const presets = getDatePresets();
    const filteredPresets = presets.filter((preset) =>
      preset.label.toLowerCase().includes(inputValue.toLowerCase())
    );

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
          <PopoverContent className="w-auto p-0" align="start">
            <div className="flex">
              {showPresets && (
                <div className="border-r">
                  <Command className="w-48">
                    <CommandInput
                      placeholder="Search presets..."
                      value={inputValue}
                      onValueChange={setInputValue}
                    />
                    <CommandList>
                      <CommandEmpty>No preset found.</CommandEmpty>
                      <CommandGroup heading="Quick Select">
                        {selectedDates.length > 0 && (
                          <CommandItem
                            onSelect={clearAll}
                            className="text-destructive"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Clear All
                          </CommandItem>
                        )}
                        {filteredPresets.map((preset) => {
                          const isSelected = selectedDates.some((date) =>
                            isSameDay(date, preset.date)
                          );
                          return (
                            <CommandItem
                              key={preset.label}
                              onSelect={() => handlePresetSelect(preset.date)}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  isSelected ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {preset.label}
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              )}
              <div className="p-3">
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => {
                    if (dates) {
                      if (value === undefined) {
                        setInternalValue(dates);
                      }
                      onValueChange?.(dates);
                    }
                  }}
                  disabled={isDateDisabled}
                  className="rounded-md border-0"
                  captionLayout="dropdown"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Selected Dates Section */}
        {selectedDates.length > 0 && (
          <div className="flex flex-wrap gap-2 p-2 bg-muted/50 rounded-md border max-h-[100px] overflow-y-auto">
            {selectedDates
              .sort((a, b) => a.getTime() - b.getTime())
              .map((date, index) => (
                <Badge
                  variant="secondary"
                  key={`${date.getTime()}-${index}`}
                  className="flex items-center gap-1"
                >
                  <CalendarIcon className="h-3 w-3" />
                  {formatDate(date)}
                  <button
                    type="button"
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleUnselect(date);
                      }
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(date);
                    }}
                    disabled={disabled}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
          </div>
        )}
      </div>
    );
  }
);

MultiDateSelect.displayName = "MultiDateSelect";
