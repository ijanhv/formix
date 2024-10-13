import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const StarRatingCode = ({ theme }: { theme: Theme }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={nightOwl}
      customStyle={{
        fontSize: "13px",
      }}
    >
      {`
import React, { useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@iconify/react";

interface StarRatingProps {
  form: any;
  scale: number;
  fieldName: string;
  theme: Theme;
}

export function StarRating({ form, scale, fieldName, theme }: StarRatingProps) {
  const stars = Array(scale).fill(0);
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
                {stars.map((star, i) => (
                  <span
                    key={i}
                    onMouseOver={() => setHoverIndex(i + 1)}
                    onMouseOut={() => setHoverIndex(0)}
                    onClick={() => {
                      setIndex(i + 1);
                      field.onChange(i + 1);
                    }}
                  >
                    {i < (hoverIndex || index) ? (
                      <Icon
                        icon="noto:star"
                        className="h-12 w-12 cursor-pointer text-yellow-500"
                      />
                    ) : (
                      <Icon
                        icon="heroicons:star"
                        style={{ color: "#FDD836" }}
                        className="h-12 w-12 cursor-pointer text-gray-700/70"
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
`}
    </SyntaxHighlighter>
  );
};

export default StarRatingCode;
