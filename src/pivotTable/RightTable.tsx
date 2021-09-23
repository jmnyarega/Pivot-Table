// components
import { FC } from "react";

// helpers
import { formatNumber } from "../helpers/format";

// types
import { CellValue, IRightTableProps, IRow } from "../types";

const RightTable: FC<IRightTableProps> = ({
  columnDimension,
  rows,
  columns,
}) => {
  const tableHeader = () => (
    <>
      <tr>
        <th className="table__caption" colSpan={columns.length}>
          {columnDimension}s
        </th>
      </tr>
      <tr>
        {columns.map((col) => (
          <th className="table__head" key={col}>
            {col}
          </th>
        ))}
      </tr>
    </>
  );

  const tableRows = () => {
    return rows.map((d: IRow[]) =>
      d?.map((d: IRow, i: number) => (
        <tr key={i}>
          {d?.cellValues?.map((cell: CellValue, i: number) => (
            <td className="table__cell" key={i}>
              {formatNumber(cell[d?.level2])}
            </td>
          ))}
          {d?.total?.map((t: [], i: number) => (
            <td key={i} className="table__cell -total">
              {formatNumber(t[d?.level1] || t)}
            </td>
          ))}
        </tr>
      ))
    );
  };

  return (
    <div className="table__scroll">
      <table className="table">
        <thead className="table__header">{tableHeader()}</thead>
        <tbody>{tableRows()}</tbody>
      </table>
    </div>
  );
};

export default RightTable;
