import { FC } from "react";
import { formatNumber } from "../../helpers/format";

// types
import { CellValue, Data, IRow, RowDimensions } from "../../types";

interface IRightTableRow {
  rowData: Data[];
  rowDimensions: RowDimensions;
}

const generateTableCells = (row: IRow, rowDimensions: RowDimensions) =>
  row.cellValues?.map((cell: CellValue, i: number) => (
    <td className="table__cell" key={i}>
      {rowDimensions.length > 1
        ? formatNumber(cell[row.level2] || cell)
        : formatNumber(cell[row.level1] || cell)}
    </td>
  ));

const generateCellsWithAggregations = (row: IRow) =>
  row.total?.map((t: [], i: number) => (
    <td key={i} className="table__cell -total">
      {formatNumber(t[row.level1] || t)}
    </td>
  ));

const TableRows: FC<IRightTableRow> = ({ rowData, rowDimensions }) => (
  <tbody>
    {rowData.map((rows: IRow[]) =>
      rows.map((row: IRow, index: number) => (
        <tr key={`${row.level1}${index}`}>
          {generateTableCells(row, rowDimensions)}
          {generateCellsWithAggregations(row)}
        </tr>
      ))
    )}
  </tbody>
);

export default TableRows;
