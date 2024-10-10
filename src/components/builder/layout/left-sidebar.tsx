"use client";

import React from "react";
import { PlusCircle, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WelcomeScreenType, QuestionType, EndScreenType } from "@/schema/zod";

type ScreenType = WelcomeScreenType | EndScreenType | QuestionType; // Assuming QuestionType includes all question types

interface LeftSidebarProps {
  screens: ScreenType[];
  currentScreenIndex: number;
  setCurrentScreenIndex: (index: number) => void;
  addNewScreen: () => void;
}

const SortableItem = ({
  id,
  children,
  isActive,
  onClick,
}: {
  id: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex p-3  items-center gap-4 justify-between rounded-lg  cursor-pointer ${
        isActive ? "bg-foreground/5 text-primary" : ""
      }`}
    >
      <div {...attributes} {...listeners}>
        <GripVertical
          className="text-gray-500 cursor-grab active:cursor-grabbing"
          size={20}
        />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
};
const LeftSidebar: React.FC<LeftSidebarProps> = ({
  screens,
  currentScreenIndex,
  setCurrentScreenIndex,
  addNewScreen,
}) => {
  const screensData = screens || []; // Ensure screensData is always defined

  // Separate Welcome and End Screens from questions
  const welcomeScreen = screensData[0];
  const endScreen = screensData[screensData.length - 1];
  const questionScreens = screensData.slice(1, -1); // Exclude Welcome and End Screens

  return (
    <div className="border-r h-full overflow-y-auto scrollbar scrollbar-w-0">
      <Button
        onClick={addNewScreen}
        className="w-full border-b py-5 rounded-none flex gap-3 items-center justify-center"
        variant="ghost"
      >
        <PlusCircle className="text-gray-500" size={20} />
        Add New Screen
      </Button>

      <SortableContext
        items={questionScreens.map((s) => s.id)} // Only allow sorting for question screens
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3   m-2">
          <SortableItem
            key={welcomeScreen.id}
            id={welcomeScreen.id}
            isActive={currentScreenIndex === 0}
            onClick={() => setCurrentScreenIndex(0)}
          >
            <span className="text-sm text-leftfont-medium line-clamp-1 ">
              Welcome Screen
            </span>
          </SortableItem>

          {questionScreens.map((screen, index) => (
            <SortableItem
              key={screen.id}
              id={screen.id}
              isActive={currentScreenIndex === index + 1}
              onClick={() => setCurrentScreenIndex(index + 1)}
            >
              <span className="text-sm text-left h-full  font-medium line-clamp-1 ">
                {screen.title || `Question ${index + 1}`}
              </span>
            </SortableItem>
          ))}

          <SortableItem
            key={endScreen.id}
            id={endScreen.id}
            isActive={currentScreenIndex === questionScreens.length + 1}
            onClick={() => setCurrentScreenIndex(questionScreens.length + 1)}
          >
            <span className="text-sm text-left font-medium line-clamp-1 ">
              End Screen
            </span>
          </SortableItem>
        </div>
      </SortableContext>
    </div>
  );
};

// function getScreenLabel(screen: ScreenType, index: number): string {
//   switch (screen.type) {
//     case "welcomeScreen":
//       return "Welcome Screen";
//     case "endScreen":
//       return "End Screen";
//     default:
//       return screen.title || `Question ${index}`;
//   }
// }

export default LeftSidebar;
