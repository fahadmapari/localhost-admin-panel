import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

interface ReviewDialogProps {
  open: boolean;
  title: string;
  remarks: string[];
  draftRemark: string;
  onDraftRemarkChange: (value: string) => void;
  onClose: () => void;
  onAddRemark: () => void;
}

const ReviewDialog = ({
  open,
  title,
  remarks,
  draftRemark,
  onDraftRemarkChange,
  onClose,
  onAddRemark,
}: ReviewDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            View existing remarks and add a new one for this review stage.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Remarks</p>
            <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border border-border p-3">
              {remarks.length ? (
                remarks.map((remark, index) => (
                  <div
                    key={`${title}-${index}`}
                    className="rounded-md bg-secondary/50 px-3 py-2 text-sm"
                  >
                    <span className="font-medium">Remark {index + 1}:</span>{" "}
                    {remark}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No remarks added yet.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="review-remark-input" className="text-sm font-medium">
              Add New Remark
            </label>
            <Textarea
              id="review-remark-input"
              value={draftRemark}
              onChange={(e) => onDraftRemarkChange(e.target.value)}
              placeholder="Leave your review remarks here"
              className="min-h-28"
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button
            type="button"
            onClick={onAddRemark}
            disabled={!draftRemark.trim()}
          >
            Add Remark
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
