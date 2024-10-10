import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export const formResponseColumns: ColumnDef<FormResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="ml-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="ml-3"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Response ID",
    cell: ({ row }) => (
      <div className="w-full text-xs font-semibold text-foreground/80">
        {row.original.id}
      </div>
    ),
    filterFn: (row, id, value) => {
      return row.original.id.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "submittedAt",
    header: "Submitted At",
    cell: ({ row }) => {
      return (
        <p className="text-xs">
          {format(new Date(row.original.submittedAt), "PPPPp")}
        </p>
      );
    },
  },
  {
    accessorKey: "responseData",
    header: "Response Data",
    cell: ({ row }) => {
      const { responseData } = row.original;
      return (
        <div className="flex flex-col items-start gap-2">
          {Object.entries(responseData).map(([key, value]) => (
            <div key={key} className="text-xs">
              <strong>{key}:</strong>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </div>
          ))}
        </div>
      );
    },
  },

  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex items-center gap-4">
  //         {/* Add action buttons here as needed */}
  //         <Link href={`/response/${row.original.id}`} className="text-blue-500">
  //           View Details
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
