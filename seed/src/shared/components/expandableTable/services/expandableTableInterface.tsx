import { TablePagination } from "../../table/services/tableInterface";

export interface ExpandableTableColumn {
  field: string;
  headerName: string;
  align?: 'left' | 'right' | 'center' | 'inherit' | 'justify';
  minWidth?: number | string;
  width?: number | string;
  headerClassName?: string;
  sortable?: boolean;
  renderCell?: (params: { row: any; value: any }) => React.ReactNode;
}

export interface ExpandableRowProps {
  row: any;
  columns: ExpandableTableColumn[];
  nestedColumns: ExpandableTableColumn[];
  getNestedRows: (row: any) => any[];
  rowId: string;
  classes: Record<string, string>;
  rowHeight: number;
}

export interface ExpandableTableProps {
  rows: any[];
  columns: ExpandableTableColumn[];
  className?: string;
  getNextPaginationData: (pager: TablePagination) => void;
  pager: TablePagination;
  loading: boolean;
  isHidePagination?: boolean;
  rowHeight?: number;
  isCustomBottom?: boolean;
  handleCancel?: () => void;
  handleSave?: () => void;
  rowId?: string;
  nestedColumns?: ExpandableTableColumn[];
  getNestedRows: (row: any) => any[];
  disableScroll?:boolean
}
