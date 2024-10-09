import React, { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RightSidebar from "./right-sidebar";
import LeftSidebar from "./left-sidebar";
import {
  usePublishFormQuery,
  useUpdateFormQuery,
} from "@/hooks/use-form-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SuccessDialog from "../success-dialog";
import { ChevronRight } from "lucide-react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  formSchema,
  FormType,
  WelcomeScreenType,
  QuestionType,
  EndScreenType,
} from "@/schema/zod";
import Screens from "./slides";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardBuilder({ formData }: { formData: FormType }) {
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [formLink, setFormLink] = useState("");
  const { mutate } = useUpdateFormQuery();
  const { mutate: publishForm, isPending: isPublishing } =
    usePublishFormQuery();

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues:
      formData.screens.length > 2
        ? formData
        : {
            id: formData.id,
            name: formData.name,
            theme: "pink-purple-theme",
            published: false,
            fontFamily: "font-poppins",
            screens: [
              {
                id: crypto.randomUUID(),
                type: "welcomeScreen",
                title: "Welcome to My Form",
                description: "Please fill out the following fields.",
                buttonText: "Start",
              },
              {
                id: crypto.randomUUID(),
                type: "endScreen",
                title: "Thank You!",
                description: "Your responses have been recorded.",
              },
            ],
          },
  });

  // const dataToSubmit = {
  //   data: form.watch(),
  //   id: formData.id
  // }
  const onSubmit = (data: FormType) => {
    // mutate(data, {
    //   onSuccess: (response) => {
    //     // setFormLink(`${process.env.NEXT_PUBLIC_API_URL}/forms/${response.id}`);
    //     // setIsSuccessDialogOpen(true);
    //   },
    // });

    mutate(data);
  };

  const addNewScreen = () => {
    const screens = form.getValues("screens") || [];
    const newScreen: WelcomeScreenType | QuestionType | EndScreenType = {
      id: crypto.randomUUID(),
      type: "short_text",
      title: `New Slide`,
      description: "",
      order: screens.length - 1,
      required: false,
    };

    const updatedScreens = [
      ...screens.slice(0, -1),
      newScreen,
      screens[screens.length - 1],
    ];
    form.setValue("screens", updatedScreens);
    setCurrentScreenIndex(1);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Prevent dragging for Welcome and End Screens
    const screens = form.getValues("screens");
    if (
      !over ||
      active.id === over.id ||
      active.id === screens[0].id || // Welcome Screen
      active.id === screens[screens.length - 1].id
    ) {
      return;
    }

    const oldIndex = screens.findIndex((s) => s.id === active.id);
    const newIndex = screens.findIndex((s) => s.id === over?.id);

    // Allow rearranging only between the question screens
    if (
      oldIndex > 0 &&
      oldIndex < screens.length - 1 &&
      newIndex > 0 &&
      newIndex < screens.length - 1
    ) {
      const newScreens = arrayMove(screens, oldIndex, newIndex);
      form.setValue("screens", newScreens);

      // Update order (optional)
      const updatedScreens = newScreens.map((screen, index) => ({
        ...screen,
        order: index,
      }));

      form.setValue("screens", updatedScreens);

      // Update currentScreenIndex if needed
      setCurrentScreenIndex(newIndex);
    }
  };

  return (
    <Form {...form}>
      <div className={`flex h-screen w-full`}>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} className="hidden md:block">
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <LeftSidebar
                screens={form.watch("screens")}
                currentScreenIndex={currentScreenIndex}
                setCurrentScreenIndex={setCurrentScreenIndex}
                addNewScreen={addNewScreen}
              />
            </DndContext>
          </ResizablePanel>
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={70} minSize={40}>
            <div
              className={`flex flex-col relative h-full ${form.watch("fontFamily")}`}
            >
              <div className="py-3 px-3 flex justify-between items-center gap-2">
                <h3 className="flex items-center gap-3">
                  <Link href={"/dashboard"}> My Forms</Link> <ChevronRight />{" "}
                  {formData.name}
                </h3>
                {!formData.published && (
                  <Button
                    type="button"
                    disabled={isPublishing}
                    onClick={() =>
                      publishForm(formData.id, {
                        onSuccess: (response) => {
                          setFormLink(
                            `${process.env.NEXT_PUBLIC_API_URL}/forms/${response.updatedForm.id}`
                          );
                          setIsSuccessDialogOpen(true);
                        },
                      })
                    }
                  >
                    Publish Form
                  </Button>
                )}
              </div>

              {form.watch("screens")?.length > 0 && (
                <Screens form={form} currentScreenIndex={currentScreenIndex} />
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle className="hidden md:flex" />
          <ResizablePanel defaultSize={25} className="hidden md:block">
            <RightSidebar
              form={form}
              onSubmit={onSubmit}
              currentSlideIndex={currentScreenIndex}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <SuccessDialog
        isOpen={isSuccessDialogOpen}
        onClose={() => setIsSuccessDialogOpen(false)}
        formLink={formLink}
      />
    </Form>
  );
}
