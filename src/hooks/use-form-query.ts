import { apiUrl } from "@/constants";
import { FormInput } from "@/schema/zod";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const createNewForm = async (data: FormInput) => {
  const res = await axios.post(`${apiUrl}/api/v1/form`, data);
  return res.data;
};

export const useCreateNewFormQuery = () => {
  return useMutation({
    mutationFn: createNewForm,
    onSuccess: (data) => {
      toast.success("Form Created successfully!", {
        position: "top-center",
      });

      // router.push(`/forms/${data.id}`);
    },
    onError: (error: any) => {
      toast.error("Error, creating form in!", {
        position: "top-center",
      });
    },
  });
};

// Get my forms

const getMyForms = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/form`);
  return res.data;
};

export const useGeMyFormsQuery = (): UseQueryResult<FormInput[]> => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: getMyForms,
    staleTime: Infinity,
  });
};
