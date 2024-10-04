"use client";
import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, formSchema, QuestionInput } from "@/schema/zod";
import Slides from "./slides";
import RightSidebar from "./right-sidebar";
import LeftSidebar from "./left-sidebar";
import { useCreateNewFormQuery } from "@/hooks/use-form-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Dashboard() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { mutate } = useCreateNewFormQuery();
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: "light-pattern",
      fontFamily: "font-poppins",
      questions: [
        {
          id: "1",
          type: "shortText",
          description: "",
          label: "Question 1",
          required: false,
        },
      ],
    },
  });

  const onSubmit = (data: FormInput) => {
    // const generatedSchema = generateZodSchema(data.questions);

    // const generatedJsx = generateFormJSX(data.questions);
    // setCode(generatedJsx);
    // setSchema(generatedSchema);
    mutate(data);
  };

  const addNewSlide = () => {
    const newQuestion: QuestionInput = {
      id: `${form.getValues("questions").length + 1}`,
      type: "shortText",
      label: `Label ${form.getValues("questions").length + 1}`,
      required: false,
      description: "",
      image: "",
    };
    form.setValue("questions", [...form.getValues("questions"), newQuestion]);
    setCurrentSlideIndex(form.getValues("questions").length - 1);
  };

  return (
    <Form {...form}>
      <div className={`flex h-screen   w-full`}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} className=" hidden md:block">
            <LeftSidebar
              questions={form.watch("questions")}
              currentSlideIndex={currentSlideIndex}
              setCurrentSlideIndex={setCurrentSlideIndex}
              addNewSlide={addNewSlide}
            />
          </ResizablePanel>
          <ResizableHandle withHandle className=" hidden md:flex" />
          <ResizablePanel defaultSize={70} minSize={40}>
            <div
              className={`flex-1 flex flex-col relative  h-full ${form.watch("fontFamily")}`}
            >
              <Slides form={form} currentSlideIndex={currentSlideIndex} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className=" hidden md:flex" />
          <ResizablePanel defaultSize={25} className=" hidden md:block">
            <RightSidebar
              form={form}
              onSubmit={onSubmit}
              currentSlideIndex={currentSlideIndex}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Form>
  );
}

// [
//   {
//       "id": "1",
//       "type": "shortText",
//       "description": "Enter your name idiot",
//       "label": "Question 1",
//       "required": false
//   },
//   {
//       "id": "2",
//       "type": "email",
//       "label": "Whats your email",
//       "required": false,
//       "description": "Enter your email",
//       "image": "https://images.unsplash.com/photo-1555769571-2ca68b9197cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8&ixlib=rb-4.0.3&q=80&w=200|https://images.unsplash.com/photo-1555769571-2ca68b9197cb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8&ixlib=rb-4.0.3&q=85|https://unsplash.com/photos/rocks-by-the-sea-UjcM2ak00KQ|Daniel Morris"
//   },
//   {
//       "id": "3",
//       "type": "multiSelect",
//       "label": "What role are you looking for",
//       "required": false,
//       "description": "",
//       "image": "",
//       "options": [
//           "Tech",
//           "Analyst",
//           "Teacher",
//           "Peon"
//       ]
//   },
//   {
//       "answer": 4,
//       "type": "rating",
//       "label": "RATE US!!",
//       "description": "Enter your email",
//       "image": "https://images.unsplash.com/photo-1507783548227-544c3b8fc065?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8&ixlib=rb-4.0.3&q=80&w=200|https://images.unsplash.com/photo-1507783548227-544c3b8fc065?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MjY4NzN8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTk2OTcyNDN8&ixlib=rb-4.0.3&q=85|https://unsplash.com/photos/selective-focus-photography-of-brown-leaves-HUiNRjXr-bQ|Timothy Eberly",
//       "required": false
//   }
// ]
