import { cellValues } from "../../helpers/aggregator";
import { initialize, clear, initialData } from "./base";

describe("#cellValues", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should get all cell values", () => {
    const cellvalues = cellValues(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric,
      data.extraColumn
    );

    const expected = [
      {
        level1: "Furniture",
        level2: "Furnishings",
        cellValues: [
          {
            state: "California",
            Furnishings: 5,
          },
          {
            state: "Delaware",
            Furnishings: 0,
          },
          {
            Furnishings: 5,
          },
        ],
      },
      {
        level1: "Furniture",
        total: [
          {
            state: "California",
            Furniture: 5,
          },
          {
            state: "Delaware",
            Furniture: 0,
          },
          {
            Furniture: 5,
          },
        ],
      },
    ];

    expect(cellvalues[0]).toEqual(expected);
  });
});
