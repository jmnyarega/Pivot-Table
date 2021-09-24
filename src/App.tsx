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
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    setLoading(true);
    await import("./data/dataset.json").then((data) => {
      setData(data?.default);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading || data.length <= 1 ? (
    <p>Loading ... </p>
  ) : (
    <PivotTable
      rowDimensions={["category", "subCategory"]}
      columnDimension="state"
      metric="quantity"
      dataset={data}
      styles={styles}
      title="products"
    />
  );
};

export default App;
