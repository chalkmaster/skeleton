export class PagedResponse<T> {
  constructor(public page: number,
              public pageSize: number,
              public totalPage: number,
              public data: T[]) {}
}
