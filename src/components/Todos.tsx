import React from "react";
import { useTodoIds, useTodos } from "../api/queries/todos.queries";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../api/mutations/todos.mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types";

export const Todos: React.FC = () => {
  const todoIdsQuery = useTodoIds();
  const todoQueries = useTodos(todoIdsQuery.data);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  if (todoIdsQuery.isPending) return <div>Loading...</div>;

  if (todoIdsQuery.isError) return <div>There is an error!</div>;

  const handleCreateTodoSubmit: SubmitHandler<Todo> = async (newTodo) => {
    createTodoMutation.mutate(newTodo);
  };

  const handleMarkAsDoneSubmit = (newTodo: Todo | undefined) => {
    if (!newTodo) return;

    updateTodoMutation.mutate({
      ...newTodo,
      checked: true,
    });
  };

  const handleDeleteTodoSubmit = async (todoId: number) => {
    deleteTodoMutation.mutateAsync(todoId);
  };

  return (
    <div>
      {/* {todoIdsQuery.data?.map((id) => (
        <div key={id}>id: {id}</div>
      ))} */}

      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo:</h4>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <button
          type="submit"
          disabled={createTodoMutation.isPending}
        >
          {createTodoMutation.isPending ? "Creating..." : "Create"}
        </button>
      </form>

      <ul>
        {todoQueries.map(({ data }) => (
          <li key={data?.id}>
            <div>Id: {data?.id}</div>
            <span>
              <strong>Titlle:</strong>
              {data?.title}, {""}
              <strong>Description:</strong>
              {data?.description}
            </span>
            <div>
              <button
                onClick={() => handleMarkAsDoneSubmit(data)}
                disabled={data?.checked}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              <button onClick={() => handleDeleteTodoSubmit(data?.id!)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
