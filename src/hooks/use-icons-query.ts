import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getIcons = async (query: string) => {
  const res = await axios.get(
    `https://api.iconify.design/search?query=${encodeURIComponent(query.trim())}&limit=5`
  );
  return res.data.icons;
};

export const useGetIconsQuery = (query: string) => {
  return useQuery({
    queryKey: [`icon_${query}`],
    queryFn: () => getIcons(query),
    staleTime: Infinity,
  });
};
