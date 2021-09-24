export type RowDimensions = string[];
export type ColumnDimension = string;
export type Data = Array<any>;
export type Columns = string[];
export type Rows = string[];
export type Metric = string;

type Styles = Object;

export interface IPivotTableProps {
  rowDimensions: RowDimensions;
  columnDimension: ColumnDimension;
  dataset: Data;
  metric: Metric;
  styles: Styles;
  title: string;
}

export interface ILeftTableProps {
  rowDimensions: RowDimensions;
  rows: Array<any>;
  title: string;
}

export interface IRightTableProps {
  columnDimension: ColumnDimension;
  rowDimensions: RowDimensions;
  rows: Array<any>;
  columns: Columns;
}

export type CellValue = Array<any>;
export type RowData = IRow[];

export interface IRow {
  level1?: any | string;
  level2?: any | string;
  cellValues?: CellValue[] | any;
  total?: CellValue;
}
