import { FC } from "react";

import LeftTable from "./LeftTable";
import RightTable from "./RightTable";

import { getRowData } from "../helpers/pivotTable";
import { getColumns } from "../helpers/columns";

import { PivotTableProps } from "../types";

import "./css/pivotTable.css";

const PivotTable: FC<PivotTableProps> = ({
  rowDimensions,
  columnDimension,
  dataset,
  metric,
  styles,
  title,
}) => {
  const columns = getColumns([], columnDimension, dataset, "Grand Total");
  const data = getRowData(dataset, rowDimensions, columnDimension, metric);
  return (
    <div className="table__container" style={styles}>
      <div className="table__wrap">
        <LeftTable rowDimensions={rowDimensions} data={data} title={title} />
        <RightTable
          columnDimension={columnDimension}
          data={data}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default PivotTable;
