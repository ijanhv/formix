import { apiUrl } from "@/constants";
import { FormInput } from "@/schema/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const createNewForm = async (data: FormInput) => {
  const res = await axios.post(`${apiUrl}/form`, data);
  return res.data;
};

export const useCreateNewFormQuery = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: createNewForm,
    onSuccess: (data) => {
      toast.success("Form Created successfully!", {
        position: "top-center",
      });

      router.push(`/forms/${data.id}`);
    },
    onError: (error: any) => {
      toast.error("Error, creating form in!", {
        position: "top-center",
      });
    },
  });
};
