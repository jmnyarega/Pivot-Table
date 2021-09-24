import { FC } from "react";

// types
import { IRightTableProps } from "../../types";

// components
import TableHeader from "../RightTable/TableHeader";
import TableRows from "./TableRows";

const RightTable: FC<IRightTableProps> = ({
  columnDimension,
  rowDimensions,
  rows,
  columns,
}) => {
  return (
    <div className="table__scroll">
      <table className="table">
        <TableHeader columnDimension={columnDimension} columns={columns} />
        <TableRows rowData={rows} rowDimensions={rowDimensions} />
      </table>
    </div>
  );
};

export default RightTable;
