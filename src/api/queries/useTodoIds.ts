import { useQuery } from "@tanstack/react-query";
import { getTodosIds } from "../services/todo.service";

export function useTodoIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

//min 10
//url: https://www.youtube.com/watch?v=3e-higRXoaM
