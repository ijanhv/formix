import { apiUrl } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getFormResponses = async (id: string) => {
  const res = await axios.get(`${apiUrl}/api/v1/form/${id}/responses`);
  return res.data;
};

export const useGeMyFormResponsesQuery = (id: string) => {
  return useQuery({
    queryKey: ["responses"],
    queryFn: () => getFormResponses(id),
    staleTime: Infinity,
  });
};
