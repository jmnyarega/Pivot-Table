import { ColumnDimension, Data, Metric, RowDimensions } from "../types";
import { cellValues } from "./sum";

export const getRowData = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => cellValues(data, rowDimensions, columnDimension, metric);
