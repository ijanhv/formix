import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

const DashboardLoadingSkeleton = () => {
  return (
    <div className="flex h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} className="hidden md:block">
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={70} minSize={40}>
          <div className="p-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="flex justify-between mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </ResizablePanel>
        <ResizablePanel defaultSize={25} className="hidden md:block">
          <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardLoadingSkeleton;
