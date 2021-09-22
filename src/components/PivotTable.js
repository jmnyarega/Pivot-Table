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
        <table className="table -scroll" border={0}>
          <thead className="table__header">
            <tr>
              <th className="table__caption" colSpan={rowDimensions.length}>
                Products
              </th>
            </tr>
            <tr>
              {rowDimensions.map((col) => (
                <th className="table__head -level" key={col}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((d) => {
              let subLevelCount = d.length;
              return d.map((l, i) => {
                subLevelCount -= 1;
                return (
                  <tr key={i}>
                    <td
                      className={`table__cell  -level-cell ${!l.level2 ? `-total` : ""}`}
                      colSpan={!l.level2 && 2}
                    >
                      {l.level2 ? "" : `${l.level1} Total`}
                      {subLevelCount === d.length - 1 ? `${l.level1}` : ""}
                    </td>
                    <td className="table__cell -level-cell"> {l.level2} </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
        <div className="table__scroll">
          <table className="table" border={0}>
            <thead className="table__header">
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
            </thead>
            <tbody>
              {data.map((d) =>
                d.map((d, i) => (
                  <tr key={i}>
                    {d?.cellSum?.map((cell, i) => (
                      <td className="table__cell" key={i}>
                        {Math.ceil(cell[d.level2])}
                      </td>
                    ))}
                    {d?.total?.map((t, i) => (
                      <td
                        key={i}
                        className="table__cell -total"
                      >
                        {Math.ceil(t[d.level1] || t)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PivotTable;
