import React from "react";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { QuestionInput } from "@/schema/zod";

interface LeftSidebarProps {
  questions: QuestionInput[];
  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
  addNewSlide: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  questions,
  currentSlideIndex,
  setCurrentSlideIndex,
  addNewSlide,
}) => {
  return (
    <div className=" border-r  ">
      <Button
        onClick={addNewSlide}
        className="w-full border-b py-5  rounded-none flex gap-3 items-center justify-center"
        variant="ghost"
      >
        <PlusCircle className="text-gray-500" size={20} />
        Add New Slide
      </Button>

      <div className="space-y-2">
        {questions.map((question, index) => (
          <div
            key={question.id}
            onClick={() => setCurrentSlideIndex(index)}
            className={`flex items-center justify-center p-3 cursor-pointer ${
              currentSlideIndex === index ? "bg-foreground/5 text-primary" : ""
            }`}
          >
            <span className="text-sm  text-center font-medium">
              {question.label || `Slide ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
