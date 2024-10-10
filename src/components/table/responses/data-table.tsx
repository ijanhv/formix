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
    const keySets = responses.map(
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
    <div className="my-10 flex flex-col gap-4">
      <h3 className="text-base md:text-2xl font-semibold text-primary">
        Form Responses
      </h3>
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100 dark:bg-foreground/10 ">
              {uniqueKeys.map((key) => (
                <TableHead
                  key={key}
                  className="w-52 whitespace-nowrap  text-left text-primary py-5"
                >
                  {key}
                </TableHead>
              ))}
              <TableHead className="text-left text-primary ">
                Submitted At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id} className="">
                {uniqueKeys.map((key) => (
                  <TableCell key={key} className="py-1 ">
                    {formatValue(response.responseData[key] || "")}
                  </TableCell>
                ))}
                <TableCell className="text-left ">
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
