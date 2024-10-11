import React from "react";
import Container from "@/components/common/container";
import FormCode from "@/components/form-code";

export default function FormCodePage({
  params,
}: {
  params: {
    formId: string;
  };
}) {
  return (
    <Container>
      <div className="max-w-7xl min-h-screen mx-auto px-5">
        <FormCode formId={params.formId} />
      </div>
    </Container>
  );
}
