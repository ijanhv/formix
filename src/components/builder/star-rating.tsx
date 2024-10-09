import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MdOutlineStar } from "react-icons/md";
import { IoStarOutline } from "react-icons/io5";

interface StarRatingProps {
  form: any;
  fieldName: string;

  theme: Theme;
}

export function StarRating({ form, fieldName, theme }: StarRatingProps) {
  const [index, setIndex] = useState(form.watch(fieldName));
  const [hoverIndex, setHoverIndex] = useState(0);
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className="">
            <FormControl>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star, i) => (
                  <span
                    key={i}
                    onMouseOver={() => setHoverIndex(i + 1)}
                    onMouseOut={() => setHoverIndex(0)}
                    onClick={() => {
                      setIndex(i + 1);
                      field.onChange(star);
                    }}
                  >
                    {i < (hoverIndex || index) ? (
                      <MdOutlineStar className="h-8 w-8 lg:h-12 lg:w-12 cursor-pointer text-yellow-500 transition-all duration-300 ease-in-out" />
                    ) : (
                      <IoStarOutline
                        className={`${theme.textColor} h-8 w-8 lg:h-12 lg:w-12 cursor-pointer  transition-all duration-300 ease-in-out`}
                      />
                    )}
                  </span>
                ))}
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
