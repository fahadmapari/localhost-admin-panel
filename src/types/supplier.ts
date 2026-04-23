import { Supplier as SupplierInput } from "@/schemas/supplier.schema";

export type SupplierStatus = "Active" | "Inactive" | "Pending" | "Suspended";

export type SupplierRecord = Omit<
  SupplierInput,
  "createdAt" | "updatedAt"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export interface SuppliersListResponse {
  suppliers: SupplierRecord[];
  total: number;
}

export interface SupplierSearchResult {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
  };
  contact: {
    email: string;
    mobile?: { code?: string; number?: string };
  };
  experience?: {
    guidingLanguages?: string[];
    guidingLocation?: string[];
  };
  status: SupplierStatus;
}
