import {
  getTotalColumnSum,
  getColumnPerParentRD,
  getColumnPerChildRD,
  getCellSum,
  getTotalParentRowSumPerCD,
  getTotalSumOfCellValues,
  formatRowData,
  insertTotals,
} from "../../helpers/sum";
import { initialize, clear, initialData } from "./base";

describe("#getTotalColumnSum", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of each columnDimension ", () => {
    const sum = getTotalColumnSum(data.data, data.columnDimension, data.metric);
    expect(sum).toEqual([47000.04, 30.84]);
  });
});

describe("#getColumnPerParentRD", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of parent level dimension per columnDimension", () => {
    const sum = getColumnPerParentRD(
      data.data,
      data.rowDimensions,
      data.metric
    );
    const expected = [
      { Furniture: 47000.04 },
      { "Office Supplies": 30.84 },
      { "Grand Total": 0 },
    ];
    expect(sum).toEqual(expected);
  });
});

describe("#getColumnPerChildRD", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of child level dimension", () => {
    const sum = getColumnPerChildRD(data.data, data.rowDimensions, data.metric);
    const expected = [{ Furnishings: 47000.04 }, { Binders: 30.84 }];
    expect(sum).toEqual(expected);
  });
});

describe("#getCellSum", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return value of cell sum", () => {
    const sum = getCellSum(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric
    )[0];

    expect(sum[0]).toEqual({ state: "California", Furnishings: 47000.04 });
    expect(sum[1]).toEqual({ state: "Delaware", Furnishings: 0 });
  });
});

describe("#getTotalChildRow", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return value of cell sum", () => {
    const sum = getCellSum(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric
    )[0];

    expect(sum[0]).toEqual({ state: "California", Furnishings: 47000.04 });
    expect(sum[1]).toEqual({ state: "Delaware", Furnishings: 0 });
  });
});

describe("#getTotalParentRowSumPerCD", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return total row sum of parent level column dimension per columnDimensio", () => {
    const sum = getTotalParentRowSumPerCD(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric
    )[0];

    expect(sum[0]).toEqual({ state: "California", Furniture: 47000.04 });
    expect(sum[1]).toEqual({ state: "Delaware", Furniture: 0 });
  });
});

describe("#getTotalSumOfCellValues", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should calculate total sum of all cell values", () => {
    const sum = getTotalSumOfCellValues(
      data.data,
      data.rowDimensions,
      data.metric
    );

    expect(sum).toEqual(47030.88);
  });
});

describe("#formatRowData", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should format row data", () => {
    const rowData = formatRowData(
      data.data,
      data.rowDimensions,
      getColumnPerChildRD(data.data, data.rowDimensions, data.metric),
      getCellSum(
        data.data,
        data.rowDimensions,
        data.columnDimension,
        data.metric
      )
    );

    const expected = {
      level1: "Furniture",
      level2: "Furnishings",
      cellValues: [
        { state: "California", Furnishings: 47000.04 },
        { state: "Delaware", Furnishings: 0 },

        {
          Furnishings: 47000.04,
        },
      ],
    };

    expect(rowData[0]).toEqual(expected);
  });
});

describe("#insertTotals", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should calculate total sum of all cell values", () => {
    const formattedData = insertTotals(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric
    );
    const expected = [
      {
        level1: "Furniture",
        level2: "Furnishings",
        cellValues: [
          { state: "California", Furnishings: 47000.04 },
          { state: "Delaware", Furnishings: 0 },

          {
            Furnishings: 47000.04,
          },
        ],
      },
      {
        level1: "Furniture",
        total: [
          { Furniture: 47000.04, state: "California" },
          { Furniture: 0, state: "Delaware" },
          { Furniture: 47000.04 },
        ],
      },
    ];
    expect(formattedData[0]).toEqual(expected);
  });
});
