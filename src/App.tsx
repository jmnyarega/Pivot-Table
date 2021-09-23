// hooks
import { useEffect, useState } from "react";

// components
import PivotTable from "./pivotTable";

const styles = {
  minHeight: "100vh",
  margin: "5% auto",
};

const App = () => {
  const [data, setData] = useState([{}]);

  const getOrders = async () =>
    await import("./data/dataset.json").then((data) => setData(data?.default));

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <PivotTable
      rowDimensions={["category", "subCategory"]}
      columnDimension="state"
      metric="sales"
      dataset={data}
      styles={styles}
      title="products"
    />
  );
};

export default App;
