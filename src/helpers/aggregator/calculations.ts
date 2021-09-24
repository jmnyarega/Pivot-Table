// types
import { Data, ColumnDimension, Metric, RowDimensions } from "../../types";

// helpers
import { columns } from "../columns";
import { getRows } from "../rows";

export const calculateTotalColumnValues = (
  data: Data,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const { values, label } = columns(columnDimension, data);
  return values.map((col: string) =>
    data
      .filter((d) => d[label] === col)
      .reduce((acc, current) => (acc += current[metric]), 0)
  );
};

export const calculateTotalValuesPerParentRowDimension = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric,
  extraDimesion: string
) => {
  const { label, values } = getRows(data, rowDimensions, extraDimesion)[0];
  return values.map((c: string) => ({
    [c]: data
      .filter((d) => d[label] === c)
      .reduce((acc, current) => (acc += current[metric]), 0),
  }));
};

export const calculateTotalOfAllCellValues = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric,
  extraDimesion: string
) => {
  const rowTotals = calculateTotalValuesPerParentRowDimension(
    data,
    rowDimensions,
    metric,
    extraDimesion
  );
  return rowTotals.reduce(
    (acc: number, cur: any) => (acc += cur[Object.keys(cur)[0]]),
    0
  );
};

export const calculateTotalPerRowDimension = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric,
  extraDimesion: string
) => {
  const { label, values } = getRows(data, rowDimensions, extraDimesion)[
    rowDimensions.length - 1
  ];
  return values.map((s: string) => ({
    [s]: data
      .filter((d) => d[label] === s)
      .reduce((acc, current) => (acc += current[metric]), 0),
  }));
};

export const calculateCellValues = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => {
  const { label, values } = getRows(data, rowDimensions, extraDimesion)[
    rowDimensions.length - 1
  ];
  const { values: cols } = columns(columnDimension, data);
  return values.map((row) =>
    cols.map((col: string) => ({
      [columnDimension]: col,
      [row]: data
        .filter((d) => d[label] === row && d[columnDimension] === col)
        .reduce((acc, current) => (acc += current[metric]), 0),
    }))
  );
};

export const calculateTotalValuesPerParentRowDimensionPerColumn = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric,
  extraDimesion: string
) => {
  const { label: llabel, values: levels } = getRows(
    data,
    rowDimensions,
    extraDimesion
  )[0];
  const { values: cols, label: clabel } = columns(columnDimension, data);

  return levels.map((c) =>
    cols.map((col: string) => ({
      [clabel]: col,
      [c]: data
        .filter((d) => d[llabel] === c && d[clabel] === col)
        .reduce((acc, current) => (acc += current[metric]), 0),
    }))
  );
};
