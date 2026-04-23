import { useMemo, useState } from "react";
import useSWR from "swr";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import DropdownSelect from "../inputs/DropdownSelect";
import {
  AdminUserRef,
  BookingOrderItemOperations,
} from "@/types/booking";

const UNASSIGNED = "Unassigned";

type OperationsState = {
  internalComment: string;
  accountingComment: string;
  transportDetails: string;
  supplierRemark: string;
  finalDetailsToProvider: boolean;
  finalDetailsByEmail: boolean;
  finalDetailsToClient: boolean;
  controlCallPicId: string | null;
  picId: string | null;
};

const toState = (ops?: BookingOrderItemOperations): OperationsState => {
  const pic =
    typeof ops?.picId === "object" && ops?.picId !== null
      ? (ops.picId as AdminUserRef)._id
      : (ops?.picId as string | null | undefined) ?? null;
  const controlPic =
    typeof ops?.controlCallPicId === "object" && ops?.controlCallPicId !== null
      ? (ops.controlCallPicId as AdminUserRef)._id
      : (ops?.controlCallPicId as string | null | undefined) ?? null;
  return {
    internalComment: ops?.internalComment ?? "",
    accountingComment: ops?.accountingComment ?? "",
    transportDetails: ops?.transportDetails ?? "",
    supplierRemark: ops?.supplierRemark ?? "",
    finalDetailsToProvider: ops?.finalDetailsToProvider ?? false,
    finalDetailsByEmail: ops?.finalDetailsByEmail ?? false,
    finalDetailsToClient: ops?.finalDetailsToClient ?? false,
    controlCallPicId: controlPic,
    picId: pic,
  };
};

interface Props {
  bookingId: string;
  itemIdx: number;
  operations?: BookingOrderItemOperations;
  onUpdated: () => void;
}

const OrderItemOperations = ({
  bookingId,
  itemIdx,
  operations,
  onUpdated,
}: Props) => {
  const [state, setState] = useState<OperationsState>(toState(operations));
  const [saving, setSaving] = useState(false);

  const { data: admins, isLoading: adminsLoading } = useSWR(
    "/admins",
    async (url) => {
      const { data } = await api.get<{ data: AdminUserRef[] }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  const adminsByLabel = useMemo(() => {
    const map: Record<string, string> = {};
    admins?.forEach((a) => {
      map[`${a.name} (${a.email})`] = a._id;
    });
    return map;
  }, [admins]);

  const adminLabelById = useMemo(() => {
    const map: Record<string, string> = {};
    admins?.forEach((a) => {
      map[a._id] = `${a.name} (${a.email})`;
    });
    return map;
  }, [admins]);

  const controlLabel = state.controlCallPicId
    ? adminLabelById[state.controlCallPicId] || UNASSIGNED
    : UNASSIGNED;
  const picLabel = state.picId
    ? adminLabelById[state.picId] || UNASSIGNED
    : UNASSIGNED;

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await api.patch(
        `/bookings/${bookingId}/order-items/${itemIdx}/operations`,
        {
          internalComment: state.internalComment,
          accountingComment: state.accountingComment,
          transportDetails: state.transportDetails,
          supplierRemark: state.supplierRemark,
          finalDetailsToProvider: state.finalDetailsToProvider,
          finalDetailsByEmail: state.finalDetailsByEmail,
          finalDetailsToClient: state.finalDetailsToClient,
          controlCallPicId: state.controlCallPicId,
          picId: state.picId,
        }
      );
      toast.success("Operations saved", {
        richColors: true,
        position: "top-center",
      });
      onUpdated();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to save operations";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setSaving(false);
    }
  };

  const dropdownOptions = [UNASSIGNED, ...Object.keys(adminsByLabel)];

  return (
    <div className="flex flex-col gap-4 mt-2 pt-4 border-t border-border">
      <div className="text-sm font-semibold uppercase text-muted-foreground">
        Operations
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Internal Comment</Label>
          <Textarea
            value={state.internalComment}
            onChange={(e) =>
              setState((s) => ({ ...s, internalComment: e.target.value }))
            }
            placeholder="Internal Comment"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Accounting Comment</Label>
          <Textarea
            value={state.accountingComment}
            onChange={(e) =>
              setState((s) => ({ ...s, accountingComment: e.target.value }))
            }
            placeholder="Accounting Comment"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Transport Details</Label>
          <Textarea
            value={state.transportDetails}
            onChange={(e) =>
              setState((s) => ({ ...s, transportDetails: e.target.value }))
            }
            placeholder="Transport Details"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Supplier Remark</Label>
          <Textarea
            value={state.supplierRemark}
            onChange={(e) =>
              setState((s) => ({ ...s, supplierRemark: e.target.value }))
            }
            placeholder="Supplier Remark"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Final details to Provider?</Label>
          <Switch
            checked={state.finalDetailsToProvider}
            onCheckedChange={(checked) =>
              setState((s) => ({ ...s, finalDetailsToProvider: checked }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Final details confirmed by Email?</Label>
          <Switch
            checked={state.finalDetailsByEmail}
            onCheckedChange={(checked) =>
              setState((s) => ({ ...s, finalDetailsByEmail: checked }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Final details to client?</Label>
          <Switch
            checked={state.finalDetailsToClient}
            onCheckedChange={(checked) =>
              setState((s) => ({ ...s, finalDetailsToClient: checked }))
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Control Call PIC</Label>
          <DropdownSelect
            label="Control Call PIC"
            options={dropdownOptions}
            value={controlLabel}
            defaultValue={controlLabel}
            disabled={adminsLoading}
            onChange={(label) => {
              const id = label === UNASSIGNED ? null : adminsByLabel[label];
              setState((s) => ({ ...s, controlCallPicId: id }));
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>PIC</Label>
          <DropdownSelect
            label="PIC"
            options={dropdownOptions}
            value={picLabel}
            defaultValue={picLabel}
            disabled={adminsLoading}
            onChange={(label) => {
              const id = label === UNASSIGNED ? null : adminsByLabel[label];
              setState((s) => ({ ...s, picId: id }));
            }}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={saving}>
          {saving && <Loader className="animate-spin" />}
          Submit
        </Button>
      </div>
    </div>
  );
};

export default OrderItemOperations;
