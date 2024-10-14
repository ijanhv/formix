import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useCreateNewFormFromTemplateQuery } from "@/hooks/use-form-query";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

const CreateFormFromTempalte = ({ templateId }: { templateId: string }) => {
  const { mutate, isPending } = useCreateNewFormFromTemplateQuery();

  const router = useRouter();

  const { data: session } = useSession();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-white rounded-md shadow-md ml-4 py-6 text-gray-700 hover:bg-gray-100 text-base"
        >
          Use this template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        {session ? (
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle>Create Form with this template</DialogTitle>
            <DialogDescription>
              Enter the details for your new form. Click save when you{"'"}re
              done.
            </DialogDescription>

            <Button
              disabled={isPending}
              onClick={() =>
                mutate(templateId, {
                  onSuccess: (response) => {
                    router.push(`/dashboard/builder/${response.form.id}`);
                  },
                })
              }
            >
              Create form
            </Button>
          </DialogHeader>
        ) : (
          <DialogHeader className="flex flex-col items-center gap-4">
            <h3 className="text-lg font-semibold">
              {" "}
              Please login to create a new form
            </h3>

            <Link href="/auth">
              <Button>Login</Button>
            </Link>
          </DialogHeader>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormFromTempalte;
