import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodo, getTodosIds } from "../services/todo.service";

export function useTodoIds() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosIds,
  });
}

export function useTodos(ids: (number | undefined)[] | undefined) {
  return useQueries({
    queries:
      (ids ?? []).map((id) => ({
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      })) ?? [],
  });
}
