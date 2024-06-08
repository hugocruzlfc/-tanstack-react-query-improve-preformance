import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/projects.service";

export function useProjects(page: number) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
}
