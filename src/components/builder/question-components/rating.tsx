import React, { useState } from "react";

import { Icon } from "@iconify/react";

interface RatingProps {
  value: number;
  max: number;
  // onChange: (value: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, max }) => {
  const [index, setIndex] = useState(value);
  const [hoverIndex, setHoverIndex] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      {Array(max)
        .fill(0)
        .map((_, i) => (
          <span
            key={i}
            onMouseOver={() => setHoverIndex(i + 1)}
            onMouseOut={() => setHoverIndex(0)}
            onClick={() => {
              setIndex(i + 1);
              // onChange(i + 1);
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
  );
};

export default Rating;
