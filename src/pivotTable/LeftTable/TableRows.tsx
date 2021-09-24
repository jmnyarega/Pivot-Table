import { FC } from "react";

// types
import { Data, IRow, RowDimensions } from "../../types";

interface ILeftTableRow {
  rowData: Data[];
  rowDimensions: RowDimensions;
}

const generateTableCells = (
  rows: Data[],
  rowDimensions: RowDimensions,
  rowCount: number,
  row: IRow,
  childRows: IRow[]
) =>
  rowDimensions.length > 1 ? (
    <>
      <td
        className={`table__cell  -level-cell ${!row.level2 ? `-total` : ""}`}
        colSpan={!row.level2 ? 2 : 0}
      >
        {!row.level2 && rows.length > 1 ? row.level1 : ""}
        {rowCount === childRows.length - 1 ? `${row.level1}` : ""}{" "}
      </td>
      <td className="table__cell -level-cell"> {row.level2} </td>
    </>
  ) : (
    <td className="table__cell -level-cell">{row.level1}</td>
  );

const generateTableRows = (rows: Data[], rowDimensions: RowDimensions) =>
  rows.map((childRows: IRow[]) => {
    let rowCount = childRows.length;
    return childRows.map((row: IRow, index: number) => {
      rowCount--;
      return (
        <tr key={`${row.level1}${index}`}>
          {generateTableCells(rows, rowDimensions, rowCount, row, childRows)}
        </tr>
      );
    });
  });

const TableRows: FC<ILeftTableRow> = ({ rowData, rowDimensions }) => (
  <tbody>{generateTableRows(rowData, rowDimensions)}</tbody>
);

export default TableRows;
