import { FC } from "react";
import { ColumnDimension, Columns } from "../../types";

interface IRightTableHeader {
  columns: Columns;
  columnDimension: ColumnDimension;
}

const TableHeader: FC<IRightTableHeader> = ({ columnDimension, columns }) => (
  <thead className="table__header">
    <tr>
      <th className="table__caption" colSpan={columns.length}>
        {columnDimension}s
      </th>
    </tr>
    <tr>
      {columns.map((column, index) => (
        <th className="table__head" key={`${column}${index}`}>
          {column}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
