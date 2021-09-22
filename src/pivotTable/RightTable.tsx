// components
import { FC } from "react";

// helpers
import { formatNumber } from "../helpers/format";

// types
import { RightTableProps } from "../types";

const RightTable: FC<RightTableProps> = ({
  columnDimension,
  data,
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
    return data.map((d: any) =>
      d?.map((d: any, i: any) => (
        <tr key={i}>
          {d?.cellValues?.map((cell: [], i: number) => (
            <td className="table__cell" key={i}>
              {formatNumber(cell[d.level2])}
            </td>
          ))}
          {d?.total?.map((t: [], i: number) => (
            <td key={i} className="table__cell -total">
              {formatNumber(t[d.level1] || t)}
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
