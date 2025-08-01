import React, { useState, useMemo, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Updated interface to include form-related props
interface VirtualizedSelectProps {
  options: string[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  height?: number;
  itemHeight?: number;
  searchable?: boolean;
  disabled?: boolean;
  // Form-related props
  name?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
  required?: boolean;
  className?: string;
}

// Other interfaces remain the same...
interface PopoverProps {
  children: React.ReactNode;
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  style?: React.CSSProperties;
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface VirtualizedListProps {
  items: string[];
  height: number;
  itemHeight: number;
  renderItem: (item: string, index: number) => React.ReactNode;
}

// Mock components remain the same...
const Popover: React.FC<PopoverProps> = ({ children }) => <>{children}</>;

const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <div
    className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-slate-950 shadow-md ${className}`}
    style={style}
    {...props}
  >
    {children}
  </div>
);

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  ...props
}) => <div {...props}>{children}</div>;

const VirtualizedList: React.FC<VirtualizedListProps> = ({
  items,
  height,
  itemHeight,
  renderItem,
}) => {
  const [scrollTop, setScrollTop] = useState<number>(0);

  const containerHeight: number = height;
  const totalHeight: number = items.length * itemHeight;
  const startIndex: number = Math.floor(scrollTop / itemHeight);
  const endIndex: number = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems: string[] = items.slice(startIndex, endIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => (
            <div key={startIndex + index} style={{ height: itemHeight }}>
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Use forwardRef to properly handle refs from React Hook Form
const VirtualizedSelect = forwardRef<HTMLButtonElement, VirtualizedSelectProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select an option...",
      searchPlaceholder = "Search...",
      height = 200,
      itemHeight = 40,
      searchable = true,
      disabled = false,
      name,
      "aria-invalid": ariaInvalid,
      "aria-describedby": ariaDescribedBy,
      required = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [open, setOpen] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const filteredOptions: string[] = useMemo(() => {
      if (!searchQuery) return options;
      return options.filter((option: string) =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery]);

    const selectedOption: string | undefined = options.find(
      (option: string) => option === value
    );

    const handleSelect = (optionValue: string): void => {
      onValueChange?.(optionValue);
      setOpen(false);
      setSearchQuery("");
    };

    const handleTriggerClick = (): void => {
      setOpen(!open);
    };

    const handleOverlayClick = (): void => {
      setOpen(false);
    };

    const handleSearchChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ): void => {
      setSearchQuery(e.target.value);
    };

    const handleSearchClick = (e: React.MouseEvent): void => {
      e.stopPropagation();
    };

    // Handle keyboard navigation for accessibility
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(!open);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const renderItem = (option: string): React.ReactNode => (
      <div
        className={`
        flex items-center px-3 py-2 cursor-pointer hover:bg-secondary rounded-md
        ${option === value ? "bg-secondary" : ""}
      `}
        onClick={() => handleSelect(option)}
      >
        <span className="flex-1 text-sm text-primary">{option}</span>
        {option === value && <Check className="h-4 w-4 text-primary" />}
      </div>
    );

    // Build trigger className with validation styles
    const triggerClassName = cn(
      "justify-between items-center border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 flex field-sizing-content w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      // Add invalid styles when aria-invalid is true
      ariaInvalid &&
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-destructive ring-destructive/20",
      className
    );

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-invalid={ariaInvalid}
            aria-describedby={ariaDescribedBy}
            aria-required={required}
            aria-haspopup="listbox"
            name={name}
            disabled={disabled}
            className={triggerClassName}
            onClick={handleTriggerClick}
            onKeyDown={handleKeyDown}
            {...rest}
          >
            <span className={selectedOption ? "" : "text-muted-foreground"}>
              {selectedOption || placeholder}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </PopoverTrigger>

        {Boolean(open && !disabled) && (
          <div className="relative" onWheel={(e) => e.preventDefault()}>
            <PopoverContent
              className="w-full p-0 mt-1 !bg-card scroll-area"
              align="start"
              style={{ width: "100%", minWidth: "200px" }}
            >
              {searchable && (
                <div className="flex items-center border-b px-3 py-2">
                  <input
                    className={cn(
                      "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                      "text-primary"
                    )}
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onClick={handleSearchClick}
                    type="text"
                    role="searchbox"
                    aria-label="Search options"
                    autoFocus={true}
                  />
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-sm text-primary text-center">
                  No options found
                </div>
              ) : (
                <div role="listbox" aria-label="Options">
                  <VirtualizedList
                    items={filteredOptions}
                    height={Math.min(
                      height,
                      filteredOptions.length * itemHeight
                    )}
                    itemHeight={itemHeight}
                    renderItem={renderItem}
                  />
                </div>
              )}
            </PopoverContent>
          </div>
        )}

        {open && (
          <div className="fixed inset-0 z-40" onClick={handleOverlayClick} />
        )}
      </Popover>
    );
  }
);

VirtualizedSelect.displayName = "VirtualizedSelect";

export default VirtualizedSelect;
