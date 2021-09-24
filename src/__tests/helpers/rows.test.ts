import { getRows } from "../../helpers/rows";
import { initialize, clear, initialData } from "./base";

describe("#getRows", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return all rows", () => {
    const rows = getRows(data.data, data.rowDimensions, data.extraColumn);
    const expected = ["Furniture", "Technology", "Total"];

    expect(rows[0].values).toEqual(expected);
    expect(rows[0].label).toEqual("category");
  });
});
