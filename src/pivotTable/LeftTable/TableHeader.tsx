import { FC } from "react";

// types
import { RowDimensions } from "../../types";

// helpers
import { formatCamelCaseHeaders } from "../../helpers/format";

interface ILeftTableHeader {
  rowDimensions: RowDimensions;
  title: string;
}

const TableHeader: FC<ILeftTableHeader> = ({ rowDimensions, title }) => (
  <thead className="table__header">
    <tr>
      <th className="table__caption" colSpan={rowDimensions?.length}>
        {title}
      </th>
    </tr>
    <tr>
      {rowDimensions?.map((col) => (
        <th className="table__head -level" key={col}>
          {formatCamelCaseHeaders(col)}
        </th>
      ))}
    </tr>
  </thead>
);

export default TableHeader;
