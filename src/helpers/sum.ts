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

/*
 *  - filters data by columns [ states ]
 *  - returns the total sum of metric(sales) of each column ( state )
 *  @return format:
 *      totalMetric: [ number, ... ]
 */
export const getTotalColumnSum = (
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

/*
 * - filters data via the parent level - category
 * - return an array of sums for each category
 * - row dimension in the return is the parent level dimension
 * @return format:
 *      totalParentLevelSum: [
 *          [rowDimensions]: Number,
 *         ...
 *      ]
 */
export const getColumnPerParentRD = (
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

/*
 * - filters data via last level - sub-category
 * - return an array of sums for each sub-category
 * - row dimension in the return is the child level dimension
 * @return format:
 *      totalChildLevelSum: [
 *          [rowDimensions]: Number,
 *         ...
 *      ]
 */
export const getColumnPerChildRD = (
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

/* @FIX
 *  - The return for is flawed, return the inner array instead....
 *
 *
 * - filters data via child level dimension
 * - maps each level with corresponding columnDimension
 * - Then calculates sum of each cell.
 * @return format:
 *      cellValue: [
 *         [
 *          { [columnDimension]: columnDimensionCorrespondingValue, [childLevelDimension]: totalValue },
 *          ....
 *         ]
 *      ]
 *
 */
export const getCellSum = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  const { label, values } = getRows(data, rowDimensions, extraRows)[1];
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

/* @revisit
 * - Gets the total row sum of parent level column dimension per columnDimension
 * - @return format:
 *      [
 *          [
 *              { [columnDimension]: columnDimensionCorrespondingValue, [parentLevelDimension]: sum },
 *              ...
 *          ]
 *      ]
 */
export const getTotalParentRowSumPerCD = (
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

/*
 * - Calculates the total sum of all cell values
 * - @returns format:
 *      number
 *
 */
export const getTotalSumOfCellValues = (
  data: Data,
  rowDimensions: RowDimensions,
  metric: Metric
) => {
  const values = getColumnPerParentRD(data, rowDimensions, metric);
  return values.reduce((acc, cur) => {
    const v: any = Object.keys(cur)[0];
    return (acc += cur[v]);
  }, 0);
};

/*
 * - Mungles data into a row format
 * - @returns format:
 *      [
 *          {
 *              level1: [value],
 *              level2: [value],
 *              cellValues: [
 *                  { [columnDimension]: value, [rowDimension]: value }
 *              ]
 *          }
 *      ]
 *
 */
export const formatRowData = (
  data: Data,
  rowDimensions: RowDimensions,
  subTotal: any,
  cellValues: CellValue[]
): Row[] => {
  // child level rows
  const rows = getRows(data, rowDimensions, extraRows)[1].values;
  return rows.map((l, index) => ({
    level1: data.find((d) => d[rowDimensions[1]] === l)[rowDimensions[0]],
    level2: l,
    cellValues: cellValues[index].concat(subTotal[index]),
  }));
};

/*
 * Insert totals to cell values
 * @returns:
 *   [
 *       {
 *           level1: [value],
 *           level2: [value],
 *           cellValues: [
 *               { [columnDimension]: value, [rowDimension]: value }
 *           ],
 *       }
 *       ....
 *       {
 *          level1: [value],
 *          total: [sum, sum, ...]
 *       }
 *   ]
 */
export const insertTotals = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => {
  // parent Level - row dimension
  const rows = getRows(data, rowDimensions, extraRows)[0].values;
  const rowData = formatRowData(
    data,
    rowDimensions,
    getColumnPerChildRD(data, rowDimensions, metric),
    getCellSum(data, rowDimensions, columnDimension, metric)
  );

  const totalColumn = getTotalColumnSum(data, columnDimension, metric);
  const childLevelTotals = getTotalParentRowSumPerCD(
    data,
    rowDimensions,
    columnDimension,
    metric
  );
  const gTotal = getTotalSumOfCellValues(data, rowDimensions, metric);
  const rowTotal = getColumnPerParentRD(data, rowDimensions, metric);

  return rows.map((level, i) => {
    const totals = childLevelTotals[i].concat(rowTotal[i]);
    return rowData
      .filter((d) => d.level1 === level)
      .concat([{ level1: level, total: totals }])
      .map((d) => {
        d.level1 === extraRows && (d.total = [...totalColumn, gTotal]);
        return d;
      });
  });
};

export const cellValues = (
  data: Data,
  rowDimensions: RowDimensions,
  columnDimension: ColumnDimension,
  metric: Metric
) => insertTotals(data, rowDimensions, columnDimension, metric);
