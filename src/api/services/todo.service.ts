import { Todo } from "../../types";
import axiosInstance from "../axios";

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<Todo>(`todos/${id}`)).data;
};

export const createTodo = async (todo: Todo) => {
  return await axiosInstance.post<Todo>("todos", todo);
};

export const updateTodo = async (todo: Todo) => {
  return await axiosInstance.put<Todo>(`todos/${todo.id}`, todo);
};

export const deleteTodo = async (id: number) => {
  return await axiosInstance.delete<Todo>(`todos/${id}`);
};
