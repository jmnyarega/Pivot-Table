import { getColumns } from "../../helpers/columns";
import { initialize, clear } from "./base";

describe("#getColumns", () => {
  let data = {
    columnDimension: "",
    rowDimensions: [""],
    extraColumns: "",
    data: [],
  };
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });
  it("should return all columns", () => {
    const columns = getColumns(
      data.rowDimensions,
      data.columnDimension,
      data.data,
      data.extraColumn
    );
    const expected = [
      "category",
      "subCategory",
      "California",
      "Delaware",
      "Total",
    ];
    expect(columns).toEqual(expected);
  });
});
