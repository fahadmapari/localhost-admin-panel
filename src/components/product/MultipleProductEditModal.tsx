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
import { difference } from "lodash";
import { Label } from "../ui/label";

interface Props {
  open: boolean;
  close: () => void;
  instantLanguages: string[];
  requestLanguages: string[];
}

const MultipleProductEditModal = ({
  close,
  open,
  instantLanguages,
  requestLanguages,
}: Props) => {
  const [selectedInstantLanguages, setSelectedInstantLanguages] =
    useState(instantLanguages);
  const [selectedRequestLanguages, setSelectedRequestLanguages] =
    useState(requestLanguages);

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
            <Label>Tour Guide Languages (Instant)</Label>
            <MultiSelect
              value={selectedInstantLanguages}
              onValueChange={(value) => {
                const uniqueValues = difference(
                  value,
                  selectedRequestLanguages
                );
                setSelectedInstantLanguages(uniqueValues);
              }}
              defaultValue={selectedInstantLanguages}
              options={instantLanguages}
            />
          </div>

          <div className="space-y-2">
            <Label>Tour Guide Languages (On Request)</Label>
            <MultiSelect
              value={selectedRequestLanguages}
              onValueChange={(value) => {
                const uniqueValues = difference(
                  value,
                  selectedInstantLanguages
                );
                setSelectedRequestLanguages(uniqueValues);
              }}
              defaultValue={selectedRequestLanguages}
              options={requestLanguages}
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
