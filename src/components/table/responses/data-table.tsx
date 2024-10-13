import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { format } from "date-fns";

const DataTable = ({ responses }: { responses: FormResponse[] }) => {
  const getUniqueKeys = (responses: FormResponse[]): string[] => {
    const keySets = responses?.map(
      (response) => new Set(Object.keys(response.responseData))
    );
    return Array.from(new Set(keySets.flatMap((set) => Array.from(set))));
  };

  const uniqueKeys = getUniqueKeys(responses);

  const formatValue = (value: string | string[]): string => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value;
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-base md:text-2xl font-semibold text-primary">
        Form Responses
      </h3>
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 dark:bg-foreground/10 w-full">
              {uniqueKeys.map((key) => (
                <TableHead
                  key={key}
                  className="px-4 py-3 w-auto  text-left text-primary"
                >
                  {key}
                </TableHead>
              ))}
              <TableHead className="px-4 py-3 w-auto text-left text-primary">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                {uniqueKeys.map((key) => (
                  <TableCell key={key} className="px-4 py-2 w-auto text-left">
                    {formatValue(response.responseData[key] || "")}
                  </TableCell>
                ))}
                <TableCell className="px-4 py-2 w-auto text-left">
                  {format(new Date(response.submittedAt), "PPPPp")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
