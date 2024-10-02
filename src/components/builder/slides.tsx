import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema, QuestionInput } from "@/schema/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SlidesProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  currentSlideIndex: number;
}

const Slides: React.FC<SlidesProps> = ({ form, currentSlideIndex }) => {
  const questions = form.watch("questions");
  const currentSlide = questions[currentSlideIndex];

  if (!currentSlide) {
    return <div className="flex-1 p-8">No slide available</div>;
  }

  return (
    <div className="flex-1 p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>{currentSlide.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormLabel>
              {currentSlide.label}
              {currentSlide.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </FormLabel>
            {renderQuestionInput(currentSlide)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function renderQuestionInput(question: QuestionInput) {
  switch (question.type) {
    case "shortText":
      return <Input />;
    case "longText":
      return <Textarea />;
    case "number":
      return <Input type="number" />;
    case "email":
      return <Input type="email" />;
    case "date":
      return <Input type="date" />;
    case "select":
    case "multiSelect":
      return (
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map((option, index) => (
              <SelectItem key={index} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "rating":
      return (
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Button key={value} variant="outline" size="sm">
              {value}
            </Button>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default Slides;
