import { ListFilter } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const FiltersScreen = () => {
  return (
    <Sheet>
      <SheetTrigger className="text-sm font-medium cursor-pointer border border-border px-2 py-1 rounded-md hover:bg-secondary transition-colors duration-200 flex items-center gap-2">
        <ListFilter size={16} />
        Show Filters
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Filters</SheetTitle>
          <SheetDescription className="text-sm">Coming Soon</SheetDescription>
        </SheetHeader>

        <div className="p-4 flex flex-col">
          <Button className="cursor-pointer">Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FiltersScreen;
