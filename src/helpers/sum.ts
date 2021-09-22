// types
import {
  Data,
  ColumnDimension,
  Metric,
  RowDimensions,
  Row,
  CellValue,
} from "../types";

// helpers
import { columns } from "./columns";
import { getRows } from "./rows";

export const extraRows = "Grand Total";

export const totalSumCell = (
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

export const totalCat = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric
) => {
  const { label, values } = getRows(data, rowDimensions, extraRows)[0];
  return values.map((c) => ({
    [c]: data
      .filter((d) => d[label] === c)
      .reduce((acc, current) => (acc += current[metric]), 0),
  }));
};

export const getSubTotal = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric
) => {
  const { label, values } = getRows(data, rowDimensions, extraRows)[1];
  return values.map((s: string) => ({
    [s]: data
      .filter((d) => d[label] === s)
      .reduce((acc, current) => (acc += current[metric]), 0),
  }));
};

export const getCellSum = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const { label, values } = getRows(data, rowDimensions, extraRows)[1];
  const { values: cols } = columns(columnDimension, data);
  return values.map((l2) =>
    cols.map((col: string) => ({
      [columnDimension]: col,
      [l2]: data
        .filter((d) => d[label] === l2 && d[columnDimension] === col)
        .reduce((acc, current) => (acc += current[metric]), 0),
    }))
  );
};

export const getRowSum = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const { label: llabel, values: levels } = getRows(
    data,
    rowDimensions,
    extraRows
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

export const grandTotalCat = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric
) => {
  const values = totalCat(data, rowDimensions, metric);
  return values.reduce((acc, cur) => {
    const v: any = Object.keys(cur)[0];
    return (acc += cur[v]);
  }, 0);
};

const rowData = (
  data: Data,
  rowDimensions: RowDimensions,
  subTotal: any,
  cellValue: CellValue
): Row[] => {
  const rows = getRows(data, rowDimensions, extraRows)[1].values;
  return rows.map((l, index) => ({
    level1: data.find((d) => d[rowDimensions[1]] === l)[rowDimensions[0]],
    level2: l,
    cellValues: cellValue[index].concat(subTotal[index]),
  }));
};

export const populateRows = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  // parent Level - row dimension
  const rows = getRows(data, rowDimensions, extraRows)[0].values;

  const subTotal = getSubTotal(data, rowDimensions, metric);
  const cellValue = getCellSum(data, rowDimensions, columnDimension, metric);
  const total = totalSumCell(data, columnDimension, metric);
  const subTotals = getRowSum(data, rowDimensions, columnDimension, metric);
  const gTotal = grandTotalCat(data, rowDimensions, metric);
  const totalCats = totalCat(data, rowDimensions, metric);

  const rData = rowData(data, rowDimensions, subTotal, cellValue);

  return rows?.map((level, i) => {
    const totals = subTotals[i].concat(totalCats[i]);

    return rData
      .filter((d) => d.level1 === level)
      .concat([{ level1: level, total: totals }])
      .map((d) => {
        if (d.level1 === extraRows) {
          d.total = [...total, gTotal];
        }
        return d;
      });
  });
};
