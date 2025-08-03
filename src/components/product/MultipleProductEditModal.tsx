import { useState } from "react";
import { MultiSelect } from "../multi-select";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  close: () => void;
  type: string;
  languages: string[];
}

const MultipleProductEditModal = ({ close, open, languages, type }: Props) => {
  const [selectedLanguages, setSelectedLanguages] = useState(languages);

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Products Variants</DialogTitle>
          <DialogDescription>
            Make changes to multiple product variants at once.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-2">
            <Label>Tour Guide Languages ({type})</Label>
            <MultiSelect
              value={selectedLanguages}
              onValueChange={(value) => {
                setSelectedLanguages(value);
              }}
              defaultValue={languages}
              options={languages}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button className="cursor-pointer" type="submit">
            Submit Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MultipleProductEditModal;
