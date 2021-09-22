import PivotTable from "./components/PivotTable";
import dataset from "./dataset.json";

const styles = {
  minHeight: "100vh",
  margin: "5% auto",
};

const App = () => (
  <PivotTable
    rowDimensions={["category", "subCategory"]}
    columnDimension="state"
    metric="sales"
    dataset={dataset}
    styles={styles}
  />
);

export default App;
