import { ColumnDimension, Data, Metric, RowDimensions } from "../types";
import { populateRows } from "./sum";

export const getRowData = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const mungledData = populateRows(
    data,
    rowDimensions,
    columnDimension,
    metric
  );
  return mungledData;
};
