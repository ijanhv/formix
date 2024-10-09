import Dashboard from "@/components/builder/layout/dashboard";
import Container from "@/components/common/container";
import React from "react";

export default function EditFormPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  return (
    <Container>
      <Dashboard formId={params.formId} />
    </Container>
  );
}
