import { ColumnDimension, Data, Metric, RowDimensions } from "../types";
import { getColumns } from "./columns";
import { cellValues } from "./aggregator/index";

export const getData = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => ({
  rows: cellValues(data, rowDimensions, columnDimension, metric, extraDimesion),
  columns: getColumns([], columnDimension, data, extraDimesion),
});
