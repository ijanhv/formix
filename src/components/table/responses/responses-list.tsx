"use client";
import { useGeMyFormResponsesQuery } from "@/hooks/use-responses-query";
import React from "react";
import Loader from "../../common/loader";
import Error from "../../common/error";
import DataTable from "./data-table";

const ResponsesList = ({ formId }: { formId: string }) => {
  const { data, isPending, isError } = useGeMyFormResponsesQuery(formId);

  if (isPending) return <Loader />;
  if (isError) return <Error />;
  return (
    <div className="flex flex-col gap-3 ">
      <DataTable responses={data.responses} />
    </div>
  );
};

export default ResponsesList;
