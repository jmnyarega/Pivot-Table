import LeftTable from "./LeftTable";
import RightTable from "./RightTable";
import { getColumns, dataLevels } from "../data";
import "./pivotTable.css";

const PivotTable = ({
  rowDimensions,
  columnDimension,
  dataset,
  metric,
  styles,
}) => {
  const columns = getColumns([], columnDimension, dataset);
  const data = dataLevels(dataset, rowDimensions, columnDimension, metric);
  return (
    <div className="table__container" style={styles}>
      <div className="table__wrap">
        <LeftTable rowDimensions={rowDimensions} data={data} />
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
