import { themes } from "@/constants";
import { FormType } from "@/schema/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Edit, TableOfContents } from "lucide-react";

const FormCard = ({ form }: { form: FormType }) => {
  const theme = themes.find((item) => item.id === form.theme);
  return (
    <div className=" rounded-lg border flex justify-between  items-center gap-3 group p-2">
      <div className="flex items-center gap-4">
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

      <div className="flex items-center gap-2">
        <Link href={`/dashboard/responses/${form.id}`}>
          <Button variant="ghost">
            <TableOfContents />
          </Button>
        </Link>

        <Link href={`/dashboard/builder/${form.id}`}>
          <Button variant="ghost">
            <Edit />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FormCard;
