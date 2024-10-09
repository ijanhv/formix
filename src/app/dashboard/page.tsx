import Container from "@/components/common/container";
import FormList from "@/components/dashboard/form-list";
import CreateForm from "@/components/form/create-form";
import React from "react";

export default function DashboardPage() {
  return (
    <Container>
      <div className="w-full my-10  min-h-screen h-full items-center flex flex-col gap-6 mx-auto   sm:px-6 md:px-10  xl:px-4  ">
        <div className="flex items-center gap-10 justify-between w-full">
          <h3 className="text-2xl font-semibold">My Workspace</h3>

          <CreateForm />
        </div>

        <FormList />
      </div>
    </Container>
  );
}
