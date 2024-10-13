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
    <div className="flex flex-col gap-3 my-10 w-full ">
      <div className="flex items-center gap-4 w-full">
        <div className="border rounded-lg p-4 flex flex-col items-center gap-3">
          <h3 className="text-2xl lg:text-4xl  font-semibold">
            {data.responses.length}
          </h3>
          <p>No. of responses</p>
        </div>
      </div>

      <hr className="my-5" />
      <DataTable responses={data.responses} />
    </div>
  );
};

export default ResponsesList;
