import { themes } from "@/constants";
import { FormType } from "@/schema/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Code, Edit, FileText, TableOfContents, Trash } from "lucide-react";
import { useDeleteFormQuery } from "@/hooks/use-form-query";
import { Hint } from "../common/hint";

const FormCard = ({ form }: { form: FormType }) => {
  const { mutate: deleteForm, isPending } = useDeleteFormQuery();
  const theme = themes.find((item) => item.id === form.theme);
  return (
    <div className=" rounded-lg  dark:bg-foreground/5 border flex flex-col md:flex-row items-center justify-start md:justify-between  md:items-center gap-3 group p-3">
      <div className="flex items-center w-full gap-4">
        <div className=" relative h-14  w-28">
          {theme?.backgroundImage ? (
            <Image
              fill
              src={theme?.backgroundImage}
              alt=""
              className="w-full h-full rounded-lg object-cover"
            />
          ) : (
            <div className={theme?.backgroundColor} />
          )}
        </div>

        <h3 className="text-lg">{form.name}</h3>
      </div>

      <div className="flex items-center gap-4">
        <Hint label="View Code">
          <Link href={`/dashboard/code/${form.id}`}>
            <Button variant="ghost">
              <Code />
            </Button>
          </Link>
        </Hint>
        <Hint label="View Responses">
          <Link href={`/dashboard/responses/${form.id}`}>
            <Button variant="ghost">
              <TableOfContents />
            </Button>
          </Link>
        </Hint>

        <Hint label="Form Link">
          <Link target="_blank" href={`/forms/${form.id}`}>
            <Button variant="ghost">
              <FileText />
            </Button>
          </Link>
        </Hint>
        <Hint label="Edit Form">
          <Link href={`/dashboard/builder/${form.id}`}>
            <Button variant="ghost">
              <Edit />
            </Button>
          </Link>
        </Hint>

        <Hint label="Delete Form">
          <Button
            disabled={isPending}
            onClick={() => deleteForm(form.id)}
            variant="destructive"
          >
            <Trash />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default FormCard;
