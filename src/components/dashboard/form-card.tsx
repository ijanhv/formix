import { themes } from "@/constants";
import { FormType } from "@/schema/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormCard = ({ form }: { form: FormType }) => {
  const theme = themes.find((item) => item.id === form.theme);
  return (
    <Link
      href={`/dashboard/builder/${form.id}`}
      className=" relative h-[150px] w-full rounded-lg border border-primary"
    >
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
    </Link>
  );
};

export default FormCard;
