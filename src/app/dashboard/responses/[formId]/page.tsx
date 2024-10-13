import Container from "@/components/common/container";
import ResponsesList from "@/components/table/responses/responses-list";
import React from "react";

export default function ResponsesPage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  return (
    <Container>
      <div className="max-w-7xl min-h-screen mx-auto px-5">
        <ResponsesList formId={params.formId} />
      </div>
    </Container>
  );
}
