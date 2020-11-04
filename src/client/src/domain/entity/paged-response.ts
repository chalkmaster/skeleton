export interface PagedResponse<T> {
  page: number;
  pageSize: number;
  totalPage: number;
  data: T[];
}
