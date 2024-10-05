"use client";
import { useGeMyFormsQuery } from "@/hooks/use-form-query";
import React from "react";
import Error from "../common/error";
import Loader from "../common/loader";
import FormCard from "./form-card";

const FormList = () => {
  const { data, isPending, isError } = useGeMyFormsQuery();
  if (isPending) return <Loader />;

  if (isError) return <Error />;

  return (
    <div className="bg-blue-100 dark:bg-foreground/5 grid grid-cols-1 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10 w-full rounded-md p-4">
      {data.map((item, index) => (
        <FormCard key={index} form={item} />
      ))}
    </div>
  );
};

export default FormList;
