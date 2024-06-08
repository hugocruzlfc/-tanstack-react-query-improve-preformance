import { ProjectPaginationResponse } from "../../types";
import axiosInstance from "../axios";

export const getProjects = async (page: number = 1) => {
  return (
    await axiosInstance.get<ProjectPaginationResponse>(
      `projects?_page=${page}&_per_page=3`
    )
  ).data;
};
