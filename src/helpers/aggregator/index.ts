// types
import {
  Data,
  ColumnDimension,
  Metric,
  RowDimensions,
  IRow,
  CellValue,
} from "../../types";
import {
  calculateCellValues,
  calculateTotalColumnValues,
  calculateTotalOfAllCellValues,
  calculateTotalPerRowDimension,
  calculateTotalValuesPerParentRowDimension,
  calculateTotalValuesPerParentRowDimensionPerColumn,
} from "./calculations";

// helpers
import { getRows, rowLevels } from "../rows";

export const formatToRowData = (
  data: Data,
  rowDimensions: RowDimensions,
  subTotal: Array<object>,
  cellValues: CellValue[],
  extraDimesion: string
): IRow[] => {
  const rows = getRows(data, rowDimensions, extraDimesion)[
    rowDimensions.length - 1
  ].values;

  return rows.map((l, index) => ({
    ...rowLevels(data, rowDimensions, l),
    cellValues: cellValues[index].concat(subTotal[index]),
  }));
};

const getGrandTotals = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => {
  const gTotal = calculateTotalOfAllCellValues(
    data,
    rowDimensions,
    metric,
    extraDimesion
  );
  const totalColumn = calculateTotalColumnValues(data, columnDimension, metric);
  return [...totalColumn, gTotal];
};

const getRowData = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => {
  const totalPerRowDimension = calculateTotalPerRowDimension(
    data,
    rowDimensions,
    metric,
    extraDimesion
  );
  const cellValues = calculateCellValues(
    data,
    rowDimensions,
    columnDimension,
    metric,
    extraDimesion
  );

  return formatToRowData(
    data,
    rowDimensions,
    totalPerRowDimension,
    cellValues,
    extraDimesion
  );
};

const singleDimesionData = (
  rowData: IRow[],
  level: string,
  grandTotals: Array<Object>,
  extraDimesion: string
) =>
  rowData
    .filter((row: IRow) => row.level1 === level)
    .map((row: IRow) => {
      row.level1 === extraDimesion && (row.cellValues = grandTotals);
      return row;
    });

const multiDimensionData = (
  rowData: IRow[],
  level: string,
  cellTotals: Array<Object>,
  grandTotals: Array<Object>,
  extraDimesion: string
) =>
  rowData
    .filter((row: IRow) => row.level1 === level)
    .concat([{ level1: level, total: cellTotals }])
    .map((row: IRow) => {
      row.level1 === extraDimesion && (row.total = grandTotals);
      return row;
    });

export const cellValues = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => {
  const rows = getRows(data, rowDimensions, extraDimesion)[0].values;
  const rowData = getRowData(
    data,
    rowDimensions,
    columnDimension,
    metric,
    extraDimesion
  );

  const grandTotals = getGrandTotals(
    data,
    rowDimensions,
    columnDimension,
    metric,
    extraDimesion
  );

  const childLevelTotals = calculateTotalValuesPerParentRowDimensionPerColumn(
    data,
    rowDimensions,
    columnDimension,
    metric,
    extraDimesion
  );

  const rowTotals = calculateTotalValuesPerParentRowDimension(
    data,
    rowDimensions,
    metric,
    extraDimesion
  );

  return rows.map((level, i) => {
    const cellTotals = childLevelTotals[i].concat(rowTotals[i]);
    return rowDimensions.length > 1
      ? multiDimensionData(
          rowData,
          level,
          cellTotals,
          grandTotals,
          extraDimesion
        )
      : singleDimesionData(rowData, level, grandTotals, extraDimesion);
  });
};
