const LeftTable = ({ rowDimensions, data }) => {
  const tableHeader = () => (
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
  );

  const tableRows = () => {
    return data.map((d) => {
      let subLevelCount = d.length;
      return d.map((l, i) => {
        subLevelCount -= 1;
        return (
          <tr key={i}>
            <td
              className={`table__cell  -level-cell ${
                !l.level2 ? `-total` : ""
              }`}
              colSpan={!l.level2 && 2}
            >
              {l.level2 ? "" : `${l.level1} Total`}
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
