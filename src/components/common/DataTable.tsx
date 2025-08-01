import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Loader } from "../ui/loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { cn } from "@/lib/utils";
import DocumentLoader from "./DocumentLoader";

function getPaginationPages(
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number = 5
): number[] {
  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = start + maxVisiblePages - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
  pageCount?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pagination,
  onPaginationChange,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange,
    manualPagination: true,
    state: {
      pagination,
    },
    pageCount: pageCount || data.length / (pagination?.pageSize || 0),
  });

  return (
    <div className="rounded-md border h-full">
      <Table className="h-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-80 text-center">
                {isLoading ? <DocumentLoader /> : <span>No Data</span>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {Boolean(pageCount && pageCount > 1) && (
        <div className="border-t border-border py-1 flex justify-between items-center">
          <div />
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "cursor-pointer",
                    !table.getCanPreviousPage() &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() =>
                    table.getCanPreviousPage() && table.setPageIndex(0)
                  }
                >
                  First
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationPrevious
                  className={cn(
                    "cursor-pointer",
                    !table.getCanPreviousPage() &&
                      "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() =>
                    table.getCanPreviousPage() && table.previousPage()
                  }
                />
              </PaginationItem>

              <PaginationItem>
                {getPaginationPages(
                  pagination?.pageIndex || 0,
                  pageCount || 0,
                  7
                ).map((page) => (
                  <PaginationLink
                    className={cn(
                      page === (pagination?.pageIndex || 0) + 1
                        ? "pointer-events-none"
                        : "opacity-50 cursor-pointer"
                    )}
                    onClick={() => table.setPageIndex(Number(page - 1))}
                    key={page}
                  >
                    {page}
                  </PaginationLink>
                ))}
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className={cn(
                    "cursor-pointer",
                    !table.getCanNextPage() && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => table.getCanNextPage() && table.nextPage()}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "cursor-pointer",
                    !table.getCanNextPage() && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() =>
                    table.getCanNextPage() &&
                    table.setPageIndex(pageCount ? pageCount - 1 : 0)
                  }
                >
                  Last
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="flex min-w-fit pr-4 text-ring">
            {(pagination?.pageIndex || 0) + 1}/{pageCount} Pages
          </div>
        </div>
      )}
    </div>
  );
}
