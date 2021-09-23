import { FC } from "react";

// types
import { ILeftTableProps } from "../types";

// helpers
import { formatCamelCaseHeaders } from "../helpers/format";

const LeftTable: FC<ILeftTableProps> = ({ rowDimensions, rows, title }) => {
  const tableHeader = () => (
    <thead className="table__header">
      <tr>
        <th className="table__caption" colSpan={rowDimensions.length}>
          {title}
        </th>
      </tr>
      <tr>
        {rowDimensions.map((col) => (
          <th className="table__head -level" key={col}>
            {formatCamelCaseHeaders(col)}
          </th>
        ))}
      </tr>
    </thead>
  );

  const tableRows = () => {
    return rows.map((d: any) => {
      let subLevelCount = d.length;
      return d.map((l: any, i: any) => {
        subLevelCount -= 1;
        return (
          <tr key={i}>
            <td
              className={`table__cell  -level-cell ${
                !l.level2 ? `-total` : ""
              }`}
              colSpan={!l.level2 ? 2 : 0}
            >
              {!l.level2 && d.length > 1 ? l.level1 : ""}
              {subLevelCount === d.length - 1 ? `${l.level1}` : ""}
            </td>
            <td className="table__cell -level-cell"> {l.level2} </td>
          </tr>
        );
      });
    });
  };

  return (
    <table className="table -scroll">
      {tableHeader()}
      <tbody>{tableRows()}</tbody>
    </table>
  );
};

export default LeftTable;
