export type RowDimensions = string[];
export type ColumnDimension = string;
export type Data = Array<any>;
export type Columns = string[];
export type Rows = string[];
export type Metric = string;

type Styles = Object;

export interface PivotTableProps {
  rowDimensions: RowDimensions;
  columnDimension: ColumnDimension;
  dataset: Data;
  metric: Metric;
  styles: Styles;
  title: string;
}

export interface LeftTableProps {
  rowDimensions: RowDimensions;
  data: Array<any>;
  title: string;
}

export interface RightTableProps {
  columnDimension: ColumnDimension;
  data: Array<any>;
  columns: Columns;
}

export type CellValue = Array<any>;
export type RowData = Row[];

export interface Row {
  level1?: any | string;
  level2?: any | string;
  cellValues?: CellValue[];
  total?: CellValue;
}
