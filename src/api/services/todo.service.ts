import { Todo } from "../../types";
import axiosInstance from "../axios";

export const getTodosIds = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
};
