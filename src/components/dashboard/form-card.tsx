import { themes } from "@/constants";
import { FormInput } from "@/schema/zod";
import Image from "next/image";
import React from "react";

const FormCard = ({ form }: { form: FormInput }) => {
  const theme = themes.find((item) => item.id === form.theme);
  return (
    <div className=" relative h-[150px] w-full rounded-lg border border-primary">
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
  );
};

export default FormCard;
