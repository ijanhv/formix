"use client";
import React from "react";

import { useGetFormByIdQuery } from "@/hooks/use-form-query";

import DashboardLoadingSkeleton from "../../loaders/dashboard-loading";
import DashboardBuilder from "./form-builder";

export default function Dashboard({ formId }: { formId: string }) {
  const { data, isPending, isError } = useGetFormByIdQuery(formId);

  if (isPending) {
    return <DashboardLoadingSkeleton />;
  }

  if (isError) {
    return <div>Error loading form data</div>;
  }

  return <DashboardBuilder formData={data} />;
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
