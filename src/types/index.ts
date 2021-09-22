export type RowDimensions = string[];
export type ColumnDimension = string;
export type Data = Array<any>;
export type Columns = string[];
export type Metric = string;

type Styles = Object;

export interface PivotTableProps {
  rowDimensions: RowDimensions;
  columnDimension: ColumnDimension;
  dataset: Data;
  metric: Metric;
  styles: Styles;
}

export interface LeftTableProps {
  rowDimensions: RowDimensions;
  data: any; // update this
}

export interface RightTableProps {
  columnDimension: ColumnDimension;
  data: any; // update this
  columns: Columns;
}
