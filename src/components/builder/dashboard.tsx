"use client";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, formSchema, QuestionInput } from "@/schema/zod";
import Slides from "./slides";
import RightSidebar from "./right-sidebar";
import LeftSidebar from "./left-sidebar";

export default function Dashboard() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      questions: [
        { id: "1", type: "shortText", label: "Question 1", required: false },
      ],
    },
  });

  const onSubmit = (data: FormInput) => {
    // console.log(data);
  };

  const addNewSlide = () => {
    const newQuestion: QuestionInput = {
      id: `${form.getValues("questions").length + 1}`,
      type: "shortText",
      label: `Question ${form.getValues("questions").length + 1}`,
      required: false,
    };
    form.setValue("questions", [...form.getValues("questions"), newQuestion]);
    setCurrentSlideIndex(form.getValues("questions").length - 1);
  };

  return (
    <Form {...form}>
      <div className="flex h-screen border-b border-r border-l w-full">
        <LeftSidebar
          questions={form.watch("questions")}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          addNewSlide={addNewSlide}
        />
        <div className="flex-1 flex flex-col">
          <Slides form={form} currentSlideIndex={currentSlideIndex} />
        </div>
        <RightSidebar
          form={form}
          onSubmit={onSubmit}
          currentSlideIndex={currentSlideIndex}
        />
      </div>
    </Form>
  );
}
