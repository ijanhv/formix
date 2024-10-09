"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { useCreateNewFormQuery } from "@/hooks/use-form-query";
import { useRouter } from "next/navigation";
import { createFormSchema, CreateFormType } from "@/schema/zod";

const CreateForm = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateNewFormQuery();
  const form = useForm<CreateFormType>({
    resolver: zodResolver(createFormSchema),
  });

  const onSubmit = (data: CreateFormType) => {
    mutate(data, {
      onSuccess: (response) => {
        // Assuming the response contains the form link
        router.push(`/dashboard/builder/${response.id}`);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Form
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            Enter the details for your new form. Click save when you{"'"}re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter form name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed for your form.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Logo</FormLabel>
                  <FormControl>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-shrink-0">
                            {field.value ? (
                              <Image
                                src={URL.createObjectURL(field.value)}
                                alt="Form Logo"
                                width={100}
                                height={100}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                <Upload className="h-8 w-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <Input
                            id="logo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => field.onChange(e.target.files[0])}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("logo-upload").click()
                            }
                          >
                            Upload Logo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormDescription>
                    Upload a logo for your form (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <div className="flex justify-end space-x-2">
              <DialogClose>
                <Button
                  disabled={isPending}
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
