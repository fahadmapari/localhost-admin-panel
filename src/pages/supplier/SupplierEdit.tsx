import PageHeading from "@/components/common/PageHeading";
import SupplierForm from "@/components/supplier/SupplierForm";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/axios";
import { Supplier } from "@/schemas/supplier.schema";
import { SupplierRecord } from "@/types/supplier";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

const coerceDates = (data: SupplierRecord): Partial<Supplier> => {
  const { _id, createdAt, updatedAt, ...rest } = data;
  void _id;
  void createdAt;
  void updatedAt;
  return {
    ...rest,
    personalInfo: {
      ...rest.personalInfo,
      dateOfBirth: rest.personalInfo?.dateOfBirth
        ? new Date(rest.personalInfo.dateOfBirth)
        : new Date(),
    },
    contract: {
      ...rest.contract,
      contractStartDate: rest.contract?.contractStartDate
        ? new Date(rest.contract.contractStartDate)
        : new Date(),
      contractEndDate: rest.contract?.contractEndDate
        ? new Date(rest.contract.contractEndDate)
        : undefined,
    },
  } as Partial<Supplier>;
};

const SupplierEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const { data, isLoading, error } = useSWR(
    id ? `/suppliers/${id}` : null,
    async (url) => {
      const { data } = await api.get<{ data: SupplierRecord }>(url);
      return data.data;
    },
    { revalidateOnFocus: false }
  );

  const handleSubmit = async (values: Supplier) => {
    if (!id) return;
    setSubmitting(true);
    try {
      await api.patch(`/suppliers/${id}`, values);
      toast.success("Supplier updated successfully", {
        richColors: true,
        position: "top-center",
      });
      navigate("/supplier");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to update supplier";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-[600px] w-full" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-4">
        <PageHeading label="Edit Supplier" />
        <p className="text-muted-foreground">Supplier not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4 h-full flex flex-col">
      <PageHeading label="Edit Supplier" />
      <SupplierForm
        defaultValues={coerceDates(data)}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="SAVE CHANGES"
      />
    </div>
  );
};

export default SupplierEdit;
