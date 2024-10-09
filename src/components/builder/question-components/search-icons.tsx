import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { useGetIconsQuery } from "@/hooks/use-icons-query";
import { Plus } from "lucide-react";
import { QuestionType } from "@/schema/zod";
import { DialogClose } from "@radix-ui/react-dialog";

export function IconsDialog({
  question,
  form,
}: {
  question: QuestionType;
  form: any; // Consider defining a specific type for form for better type safety
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: icons, isPending, isError } = useGetIconsQuery(searchTerm);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleIconSelect = (icon: string) => {
    // Update the form value to include the selected icon
    const currentOptions =
      form.watch(`screens.${question.order}.options`) || [];
    form.setValue(`screens.${question.order}.options`, [
      ...currentOptions,
      {
        imageUrl: icon,
        label: "", // Provide an empty label initially
        // value: icon.toLowerCase().replace(/\s+/g, "_"), // Generate value based on icon
      },
    ]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`h-full w-full border rounded-xl border-black/10 flex items-center justify-center `}
        >
          <Plus size={40} />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Icons</DialogTitle>
          <DialogDescription>
            Search and select icons from the available library.
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="grid gap-4 py-4">
          <Input
            id="iconSearch"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="col-span-3"
          />

          {/* Display Icons */}
          <div className="grid grid-cols-4 md:grid-cols-4  gap-4 mt-4 h-56 overflow-y-scroll scrollbar scrollbar-w-0">
            {isPending ? (
              <p>Loading icons...</p>
            ) : isError ? (
              <p>Error loading icons. Try again.</p>
            ) : icons.length > 0 ? (
              icons.map((icon: string) => (
                <DialogClose
                  key={icon}
                  onClick={() => handleIconSelect(icon)} // Handle icon selection
                  className="flex flex-col items-center p-2 border rounded cursor-pointer "
                >
                  <Icon icon={icon} className="w-12 h-12 mb-2" />
                  <p className="text-xs break-all">{icon}</p>
                </DialogClose>
              ))
            ) : (
              <p>No icons found. Try searching for something else!</p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              /* Close dialog logic here if needed */
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
