"use client";

import type React from "react";

import { useState, useRef, type KeyboardEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiValueTextareaProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiValueTextarea({
  value = [],
  onChange,
  placeholder = "Type and press Enter to add tags...",
  className,
  disabled = false,
}: MultiValueTextareaProps) {
  const [inputValue, setInputValue] = useState("");
  const [, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmedValue = inputValue.trim();

      if (trimmedValue && !value.includes(trimmedValue)) {
        const newValues = [...value, trimmedValue];
        onChange?.(newValues);
        setInputValue("");
      }
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      const newValues = value.slice(0, -1);
      onChange?.(newValues);
    }
  };

  const removeValue = (indexToRemove: number) => {
    const newValues = value.filter((_, index) => index !== indexToRemove);
    onChange?.(newValues);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");

    // Check if the pasted text contains newlines
    if (pastedText.includes("\n") || pastedText.includes("\r")) {
      e.preventDefault();

      // Split by various line break types and filter out empty lines
      const lines = pastedText
        .split(/\r?\n|\r/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length > 0) {
        // Add only unique lines that aren't already in the value array
        const newValues = [...value];
        lines.forEach((line) => {
          if (!newValues.includes(line)) {
            newValues.push(line);
          }
        });

        onChange?.(newValues);
        setInputValue(""); // Clear the input after processing
      }
    }
    // If no newlines, let the default paste behavior handle it
  };

  const handleContainerClick = () => {
    // Focus input when clicking on the container
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={cn(
        "flex w-full flex-wrap items-start gap-1 ring-offset-background cursor-text border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30  field-sizing-content min-h-16 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onClick={handleContainerClick}
    >
      {value.map((item, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="flex items-center gap-1 pr-1 m-0.5 text-xs"
        >
          <span>{item}</span>
          {!disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeValue(index);
              }}
              className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </Badge>
      ))}

      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={value.length === 0 ? placeholder : ""}
        disabled={disabled}
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}
