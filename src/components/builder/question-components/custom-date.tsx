"use client";

import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form"; // Import shadcn Form components
import { Input } from "@/components/ui/input";

interface CustomDateInputProps {
  form: UseFormReturn<any>;
}

export default function CustomDateInput({ form }: CustomDateInputProps) {
  const { control, watch } = form;

  // Local state to keep track of the complete date value
  const [, setFullDate] = useState<string>("");

  // Watch form fields for changes
  const month = watch("date-month");
  const day = watch("date-day");
  const year = watch("date-year");

  // Update the full date whenever any of the fields change
  useEffect(() => {
    if (month && day && year) {
      setFullDate(`${month}/${day}/${year}`);
    } else {
      setFullDate("");
    }
  }, [month, day, year]);

  return (
    <div className="flex gap-4 items-end mb-4 space-x-2">
      {/* Month Input */}
      <FormField
        name="date-day"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="date-month">Month</FormLabel>
            <FormControl>
              <>
                <Input
                  id="date-day"
                  placeholder="DD"
                  {...field}
                  min={1}
                  max={31}
                  className="border-none border-b-2  placeholder:text-foreground/35 focus-visible:border-b-gray-700 focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none"
                />
                <hr />
              </>
            </FormControl>
          </FormItem>
        )}
      />
      <span className="text-2xl text-gray-400">/</span>

      {/* Day Input */}
      <FormField
        name="date-month"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="date-day">Day</FormLabel>
            <FormControl>
              <>
                <Input
                  id="date-month"
                  placeholder="MM"
                  {...field}
                  min={1}
                  max={12}
                  className="border-none border-b-2  placeholder:text-foreground/35 focus-visible:border-b-gray-700 focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none"
                />
                <hr />
              </>
            </FormControl>
          </FormItem>
        )}
      />
      <span className="text-4xl text-gray-400">/</span>

      {/* Year Input */}
      <FormField
        name="date-year"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="date-year">Year</FormLabel>
            <FormControl>
              <>
                <Input
                  id="date-year"
                  placeholder="YYYY"
                  {...field}
                  min={1900}
                  max={2100}
                  className="border-none border-b-2  placeholder:text-foreground/35 focus-visible:border-b-gray-700 focus-visible:ring-0 focus-visible:ring-transparent rounded-none focus:ring-0 focus:border-none shadow-none"
                />
                <hr />
              </>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
