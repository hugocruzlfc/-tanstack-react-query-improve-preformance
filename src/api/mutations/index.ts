import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "../services/todo.service";
import { Todo } from "../../types";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (todo: Todo) => createTodo(todo),
    onMutate: () => {
      console.log("onMutate");
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: async (_, error) => {
      console.log("onSettled");
      if (error) {
        console.log("error", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (todo: Todo) => updateTodo(todo),
    onSettled: async (_, error, variables) => {
      console.log("onSettled");
      if (error) {
        console.log("error", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
        await queryClient.invalidateQueries({
          queryKey: [
            "todo",
            {
              id: variables.id,
            },
          ],
        });
      }
    },
  });
}

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["todo"],
    mutationFn: (id: number) => deleteTodo(id),
    onSettled: async (_, error) => {
      console.log("onSettled");
      if (error) {
        console.log("error", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
  });
}
