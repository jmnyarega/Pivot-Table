import { FC } from "react";

// components
import LeftTable from "./LeftTable";
import RightTable from "./RightTable";

// helpers
import { getRowData } from "../helpers/pivotTable";

// types
import { IPivotTableProps } from "../types";

// css
import "./css/pivotTable.css";

const PivotTable: FC<IPivotTableProps> = ({
  rowDimensions,
  columnDimension,
  dataset,
  metric,
  styles,
  title,
}) => {
  const { columns, rows } = getRowData(
    dataset,
    rowDimensions,
    columnDimension,
    metric
  );
  return (
    <div className="table__container" style={styles}>
      <div className="table__wrap">
        <LeftTable rowDimensions={rowDimensions} rows={rows} title={title} />
        <RightTable
          columnDimension={columnDimension}
          rows={rows}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default PivotTable;
