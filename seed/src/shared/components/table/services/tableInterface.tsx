export interface TablePagination {
  Items?: number;
  currentPage: number;
  limit: number;
  totalPages: number;
  startPage?: number;
  endPage?: number;
  startIndex?: number;
  endIndex?: number;
  pages?: Array<number>;
}
