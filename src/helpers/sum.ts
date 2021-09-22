// types
import { Data, ColumnDimension, Metric, RowDimensions } from "../types";

// helpers
import { columns } from "./columns";
import { getRows } from "./rows";

export const extraRows = ["Grand Total"];

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

export const populateRows = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const rows = getRows(data, rowDimensions, extraRows)[1].values;

  const subTotal = getSubTotal(data, rowDimensions, metric);
  const cellSum = getCellSum(data, rowDimensions, columnDimension, metric);
  const total = totalSumCell(data, columnDimension, metric);
  const subTotals = getRowSum(data, rowDimensions, columnDimension, metric);
  const gTotal = grandTotalCat(data, rowDimensions, metric);
  const totalCats = totalCat(data, rowDimensions, metric);

  const rowData = rows.map((l, index) => ({
    level1: data.find((d) => d[rowDimensions[1]] === l)[rowDimensions[0]],
    level2: l,
    cellSum: cellSum[index].concat(subTotal[index]),
  }));

  return rowData.map((d, i) =>
    rows
      .filter((level) => {
        console.log(i);
        return level === d.level1;
      })
      .concat([{ ...d, total: subTotal[i] }])
  );
};

// return rows?.map((level, i) =>
//   rowData
//     .filter((d) => d.level1 === level)
//     .concat({ level1: level, total: subTotals[i].concat(totalCats[i]) })
//     .map((d) => {
//       if (d.level1 === "Grand Total") {
//         d?.total = [...total, gTotal];
//       }
//       return d;
//     })
// );
