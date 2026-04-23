import { useMemo, useState } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Loader, Mail, Plus, Trash2, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DropdownSelect from "../inputs/DropdownSelect";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import {
  GuideAssignment,
  GuideAssignmentStatus,
} from "@/types/booking";
import { SupplierSearchResult } from "@/types/supplier";
import dayjs from "dayjs";

const STATUS_OPTIONS: GuideAssignmentStatus[] = [
  "invited",
  "confirmed",
  "declined",
  "completed",
];

const statusVariant: Record<
  GuideAssignmentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  invited: "secondary",
  confirmed: "default",
  declined: "destructive",
  completed: "outline",
};

interface Props {
  bookingId: string;
  itemIdx: number;
  assignments: GuideAssignment[];
  onUpdated: () => void;
}

const GuideAssignments = ({
  bookingId,
  itemIdx,
  assignments,
  onUpdated,
}: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data: suppliers, isLoading: suppliersLoading } = useSWR(
    dialogOpen
      ? `/suppliers/search${search ? `?q=${encodeURIComponent(search)}` : ""}`
      : null,
    async (url) => {
      const { data } = await api.get<{ data: SupplierSearchResult[] }>(url);
      return data.data;
    }
  );

  const suppliersByLabel = useMemo(() => {
    const map: Record<string, SupplierSearchResult> = {};
    suppliers?.forEach((s) => {
      const label = `${s.personalInfo.firstName} ${s.personalInfo.lastName} (${s.contact.email})`;
      map[label] = s;
    });
    return map;
  }, [suppliers]);

  const supplierLabelById = useMemo(() => {
    const map: Record<string, string> = {};
    suppliers?.forEach((s) => {
      map[s._id] =
        `${s.personalInfo.firstName} ${s.personalInfo.lastName} (${s.contact.email})`;
    });
    return map;
  }, [suppliers]);

  const assignedIds = useMemo(
    () =>
      new Set(
        assignments.map((a) =>
          typeof a.supplierId === "object"
            ? a.supplierId._id
            : (a.supplierId as string)
        )
      ),
    [assignments]
  );

  const availableOptions = useMemo(
    () =>
      Object.keys(suppliersByLabel).filter(
        (label) => !assignedIds.has(suppliersByLabel[label]._id)
      ),
    [suppliersByLabel, assignedIds]
  );

  const resetDialog = () => {
    setSearch("");
    setSelectedSupplierId("");
    setNotes("");
  };

  const handleAssign = async () => {
    if (!selectedSupplierId) {
      toast.error("Pick a guide to assign", {
        richColors: true,
        position: "top-center",
      });
      return;
    }

    setSaving(true);
    try {
      await api.post(
        `/bookings/${bookingId}/order-items/${itemIdx}/guides`,
        { supplierId: selectedSupplierId, notes: notes || undefined }
      );
      toast.success("Guide assigned", {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
      resetDialog();
      setDialogOpen(false);
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to assign guide";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (
    assignmentId: string,
    status: GuideAssignmentStatus
  ) => {
    setBusyId(assignmentId);
    try {
      await api.patch(
        `/bookings/${bookingId}/order-items/${itemIdx}/guides/${assignmentId}`,
        { status }
      );
      toast.success("Status updated", {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to update status";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setBusyId(null);
    }
  };

  const handleRemove = async (assignmentId: string) => {
    if (!window.confirm("Remove this guide from the assignment?")) return;

    setBusyId(assignmentId);
    try {
      await api.delete(
        `/bookings/${bookingId}/order-items/${itemIdx}/guides/${assignmentId}`
      );
      toast.success("Guide removed", {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to remove guide";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="flex flex-col gap-3 pt-4 border-t border-border">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2">
          <UserCog className="size-4" />
          Guide Assignments
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setDialogOpen(true)}
        >
          <Plus />
          Add Guide
        </Button>
      </div>

      {assignments.length === 0 ? (
        <div className="text-sm text-muted-foreground py-4 text-center border border-dashed rounded-md">
          No guides assigned yet.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email / Mobile</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((a) => {
                const supplier =
                  typeof a.supplierId === "object" ? a.supplierId : null;
                const fullName = supplier
                  ? `${supplier.personalInfo.firstName} ${supplier.personalInfo.lastName}`
                  : "(unknown)";
                const email = supplier?.contact?.email;
                const mobile = supplier?.contact?.mobile;
                const mobileStr =
                  mobile?.number
                    ? `${mobile.code || ""} ${mobile.number}`.trim()
                    : "";

                return (
                  <TableRow key={a._id}>
                    <TableCell className="font-medium capitalize">
                      {fullName}
                      {a.notes ? (
                        <div className="text-xs text-muted-foreground mt-1">
                          {a.notes}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {email ? <div>{email}</div> : null}
                      {mobileStr ? (
                        <div className="text-xs text-muted-foreground">
                          {mobileStr}
                        </div>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {dayjs(a.assignedAt).format("DD MMM YYYY")}
                    </TableCell>
                    <TableCell className="min-w-40">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={statusVariant[a.status]}
                          className="capitalize"
                        >
                          {a.status}
                        </Badge>
                        <DropdownSelect
                          options={STATUS_OPTIONS}
                          value={a.status}
                          defaultValue={a.status}
                          label="Status"
                          onChange={(v) =>
                            handleStatusChange(
                              a._id,
                              v as GuideAssignmentStatus
                            )
                          }
                          disabled={busyId === a._id}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {email ? (
                          <Button asChild size="sm" variant="outline">
                            <a href={`mailto:${email}`}>
                              <Mail />
                              Message
                            </a>
                          </Button>
                        ) : null}
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemove(a._id)}
                          disabled={busyId === a._id}
                        >
                          {busyId === a._id ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <Trash2 />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetDialog();
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Assign Guide</DialogTitle>
            <DialogDescription>
              Pick an active guide to assign to this order item.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Search</Label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Guide</Label>
              <DropdownSelect
                label="Guide"
                options={availableOptions}
                disabled={suppliersLoading || availableOptions.length === 0}
                value={
                  selectedSupplierId
                    ? supplierLabelById[selectedSupplierId] || ""
                    : ""
                }
                defaultValue=""
                onChange={(label) => {
                  const sup = suppliersByLabel[label];
                  setSelectedSupplierId(sup?._id || "");
                }}
              />
              {!suppliersLoading && availableOptions.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                  No matching active guides (or all shown are already
                  assigned).
                </span>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Notes (optional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Brief for the guide"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setDialogOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAssign}
              disabled={saving || !selectedSupplierId}
            >
              {saving && <Loader className="animate-spin" />}
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuideAssignments;
