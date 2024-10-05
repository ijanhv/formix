"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import AuthScreen from "@/components/auth/auth-screen";
import { SignInFlow } from "../../../auth-types";

export default function AuthPage({
  searchParams,
}: {
  searchParams: { authType: SignInFlow; mailId?: string };
}) {
  const formType = searchParams.authType;
  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    return router.push("/");
  }
  return <AuthScreen authType={formType} />;
}
