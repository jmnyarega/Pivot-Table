import { FC } from "react";

// types
import { ILeftTableProps } from "../../types";

// components
import TableRows from "./TableRows";
import TableHeader from "./TableHeader";

const LeftTable: FC<ILeftTableProps> = ({ rowDimensions, rows, title }) => (
  <table className="table -scroll">
    <TableHeader rowDimensions={rowDimensions} title={title} />
    <TableRows rowData={rows} rowDimensions={rowDimensions} />
  </table>
);

export default LeftTable;
