import { useState } from "react";
import { OnChangeFn, PaginationState } from "@tanstack/react-table";

export function usePaginationControl(
  initialState: PaginationState = { pageIndex: 0, pageSize: 10 }
): [PaginationState, OnChangeFn<PaginationState>] {
  const [pagination, setPagination] = useState<PaginationState>(initialState);

  const wrappedSetPagination: OnChangeFn<PaginationState> = (updater) => {
    setPagination((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  return [pagination, wrappedSetPagination];
}
