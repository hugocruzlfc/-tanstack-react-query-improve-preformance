export interface Project {
  id?: number;
  name: string;
}

export interface ProjectPaginationResponse {
  data: Project[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}
