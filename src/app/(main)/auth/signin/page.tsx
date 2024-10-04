import React from "react";
import Signin from "@/components/auth/signin";

export default function AuthForm() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  lg:flex-row">
      <Signin />
    </div>
  );
}
