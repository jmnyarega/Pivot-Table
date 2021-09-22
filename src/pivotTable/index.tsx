import { FC } from "react";

import LeftTable from "./LeftTable";
import RightTable from "./RightTable";

import { getRowData } from "../helpers/pivotTable";

import { PivotTableProps } from "../types";

import "./css/pivotTable.css";

const PivotTable: FC<PivotTableProps> = ({
  rowDimensions,
  columnDimension,
  dataset,
  metric,
  styles,
}) => {
  // const columns = getColumns([], columnDimension, dataset, ["Grand Total"]);
  // const data = dataLevels(dataset, rowDimensions, columnDimension, metric);
  const data = getRowData(dataset, rowDimensions, columnDimension, metric);
  console.log(data);
  return (
    <div className="table__container" style={styles}>
      <div className="table__wrap">
        <LeftTable rowDimensions={rowDimensions} data={data} />
        {/* <RightTable */}
        {/*   columnDimension={columnDimension} */}
        {/*   data={data} */}
        {/*   columns={columns} */}
        {/* /> */}
      </div>
    </div>
  );
};

export default PivotTable;
