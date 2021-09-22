import { RowDimensions, ColumnDimension, Data } from "../types";

export const columns = (columnDimension: ColumnDimension, data: Data) => ({
  values: Array.from(new Set(data.map((d) => d[columnDimension]))).sort(),
  label: columnDimension,
});

export const getColumns = (
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  data: Data,
  extraColumns: string
) => [...rowDimensions, ...columns(columnDimension, data).values, extraColumns];
