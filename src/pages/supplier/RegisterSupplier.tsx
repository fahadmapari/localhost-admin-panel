import PageHeading from "@/components/common/PageHeading";
import SupplierForm from "@/components/supplier/SupplierForm";
import api from "@/lib/axios";
import { Supplier } from "@/schemas/supplier.schema";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const RegisterSupplier = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (values: Supplier) => {
    setSubmitting(true);
    try {
      await api.post("/suppliers", values);
      toast.success("Supplier created successfully", {
        richColors: true,
        position: "top-center",
      });
      navigate("/supplier");
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Failed to create supplier";
      toast.error(message, { richColors: true, position: "top-center" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <PageHeading label="Register Supplier" />
      <SupplierForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
};

export default RegisterSupplier;
