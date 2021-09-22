const RightTable = ({ columnDimension, data, columns }) => {
  const tableHeader = () => (
    <>
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
    </>
  );

  const tableRows = () => {
    return data.map((d) =>
      d.map((d, i) => (
        <tr key={i}>
          {d?.cellSum?.map((cell, i) => (
            <td className="table__cell" key={i}>
              {Math.ceil(cell[d.level2])}
            </td>
          ))}
          {d?.total?.map((t, i) => (
            <td key={i} className="table__cell -total">
              {Math.ceil(t[d.level1] || t)}
            </td>
          ))}
        </tr>
      ))
    );
  };

  return (
    <div className="table__scroll">
      <table className="table" border={0}>
        <thead className="table__header">
          {tableHeader(columnDimension, columns)}
        </thead>
        <tbody>{tableRows(data)}</tbody>
      </table>
    </div>
  );
};

export default RightTable;
