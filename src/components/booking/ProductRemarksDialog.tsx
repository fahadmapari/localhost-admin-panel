import { useState } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Loader, MessageSquare, Send, Trash2 } from "lucide-react";
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
import { ScrollArea } from "../ui/scroll-area";
import { useAuthStore } from "@/store/auth.store";
import { AdminUserRef } from "@/types/booking";
import dayjs from "dayjs";

interface ProductRemark {
  _id: string;
  productId: string;
  text: string;
  authorId?: (AdminUserRef & { role: string }) | string | null;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productTitle: string;
}

const ProductRemarksDialog = ({
  open,
  onOpenChange,
  productId,
  productTitle,
}: Props) => {
  const user = useAuthStore((s) => s.user);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, mutate } = useSWR(
    open && productId ? `/products/${productId}/remarks` : null,
    async (url) => {
      const { data } = await api.get<{ data: ProductRemark[] }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  const handleSubmit = async () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setSubmitting(true);
    try {
      await api.post(`/products/${productId}/remarks`, { text: trimmed });
      setText("");
      mutate();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to add remark";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (remarkId: string) => {
    if (!window.confirm("Delete this remark?")) return;
    setDeletingId(remarkId);
    try {
      await api.delete(`/products/remarks/${remarkId}`);
      mutate();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to delete remark";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setDeletingId(null);
    }
  };

  const canDelete = (authorId: ProductRemark["authorId"]) => {
    if (!user) return false;
    if (user.role === "super admin") return true;
    if (typeof authorId === "object" && authorId) {
      return authorId._id === user.id;
    }
    return authorId === user.id;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Product Remarks</DialogTitle>
          <DialogDescription className="truncate">
            {productTitle}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-2">
          {isLoading ? (
            <div className="text-sm text-muted-foreground text-center py-6">
              Loading remarks…
            </div>
          ) : !data?.length ? (
            <div className="flex flex-col items-center gap-2 py-8 text-muted-foreground">
              <MessageSquare />
              <span className="text-sm">No remarks yet.</span>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {data.map((r) => {
                const author =
                  typeof r.authorId === "object" && r.authorId
                    ? r.authorId
                    : null;
                return (
                  <div
                    key={r._id}
                    className="border border-border rounded-md p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium text-foreground capitalize">
                          {author?.name || "Unknown"}
                        </span>
                        {author?.role ? (
                          <span className="capitalize"> · {author.role}</span>
                        ) : null}
                        <span>
                          {" "}
                          · {dayjs(r.createdAt).format("DD MMM YYYY HH:mm")}
                        </span>
                      </div>
                      {canDelete(r.authorId) ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(r._id)}
                          disabled={deletingId === r._id}
                        >
                          {deletingId === r._id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Trash2 className="size-4" />
                          )}
                        </Button>
                      ) : null}
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{r.text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="flex flex-col gap-2 pt-2 border-t border-border">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a remark…"
            disabled={submitting}
          />
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !text.trim()}
            >
              {submitting ? <Loader className="animate-spin" /> : <Send />}
              Post Remark
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductRemarksDialog;
