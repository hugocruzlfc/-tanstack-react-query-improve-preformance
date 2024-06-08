export interface Product {
  id: number;
  name: string;
}

export interface ProductPaginationResponse {
  data: Product[];
  first: number;
  items: number;
  last: number;
  next: number;
  pages: number;
  prev: number;
}
