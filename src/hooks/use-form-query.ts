import { apiUrl } from "@/constants";
import { CreateFormType, FormType } from "@/schema/zod";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

const createNewForm = async (data: CreateFormType) => {
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

const updateForm = async (data: FormType) => {
  const res = await axios.put(`${apiUrl}/api/v1/form/${data.id}`, data);
  return res.data;
};

export const useUpdateFormQuery = () => {
  return useMutation({
    mutationFn: updateForm,
    onSuccess: (data) => {
      toast.success("Form saved successfully!", {
        position: "top-center",
      });

      // router.push(`/forms/${data.id}`);
    },
    onError: (error: any) => {
      toast.error("Error, creating form!", {
        position: "top-center",
      });
    },
  });
};

const publishForm = async (id: string) => {
  const res = await axios.patch(`${apiUrl}/api/v1/form/${id}/publish`, {
    published: true,
  });
  return res.data;
};

export const usePublishFormQuery = () => {
  return useMutation({
    mutationFn: publishForm,
    onSuccess: (data) => {
      toast.success("Form published successfully!", {
        position: "top-center",
      });

      // router.push(`/forms/${data.id}`);
    },
    onError: (error: any) => {
      toast.error("Error, publishing form!", {
        position: "top-center",
      });
    },
  });
};

const getFormById = async (id: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/form/${id}`);
  return res.data;
};

export const useGetFormByIdQuery = (id: string): UseQueryResult<FormType> => {
  return useQuery({
    queryKey: [`form_${id}`],
    queryFn: () => getFormById(id),
    staleTime: Infinity,
  });
};

// Get my forms

const getMyForms = async () => {
  const res = await axios.get(`${apiUrl}/api/v1/form`);
  return res.data;
};

export const useGeMyFormsQuery = (): UseQueryResult<FormType[]> => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: getMyForms,
    staleTime: Infinity,
  });
};
