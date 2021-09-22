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
  name: string;
}

export interface LeftTableProps {
  rowDimensions: RowDimensions;
  data: any; // update this
  name: string;
}

export interface RightTableProps {
  columnDimension: ColumnDimension;
  data: any; // update this
  columns: Columns;
}

export type CellValue = Array<any>;
export type RowData = Row[];

export interface Row {
  level1?: string;
  level2?: string;
  cellValues?: CellValue[];
  total?: CellValue;
}
