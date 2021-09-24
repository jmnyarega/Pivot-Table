import {
  calculateCellValues,
  calculateTotalColumnValues,
  calculateTotalOfAllCellValues,
  calculateTotalPerRowDimension,
  calculateTotalValuesPerParentRowDimension,
  calculateTotalValuesPerParentRowDimensionPerColumn,
} from "../../helpers/aggregator/calculations";
import { initialize, clear, initialData } from "./base";

describe("#calculateTotalColumnValues", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of each columnDimension ", () => {
    const values = calculateTotalColumnValues(
      data.data,
      data.columnDimension,
      data.metric
    );
    expect(values).toEqual([5, 5]);
  });
});

describe("#calculateTotalValuesPerParentRowDimension", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of parent level dimension per columnDimension", () => {
    const result = calculateTotalValuesPerParentRowDimension(
      data.data,
      data.rowDimensions,
      data.metric,
      data.extraColumn
    );

    expect(result[0].Furniture).toEqual(5);
    expect(result[1].Technology).toEqual(5);
  });
});

describe("#calculateTotalPerRowDimension", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return the total sum of child level dimension", () => {
    const sum = calculateTotalPerRowDimension(
      data.data,
      data.rowDimensions,
      data.metric,
      data.extraColumn
    );
    const expected = [{ Furnishings: 5 }, { Phones: 5 }];
    expect(sum).toEqual(expected);
  });
});

describe("#calculateCellValues", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return value of cell sum", () => {
    const sum = calculateCellValues(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric,
      data.extraColumn
    )[0];

    expect(sum[0]).toEqual({ state: "California", Furnishings: 5 });
    expect(sum[1]).toEqual({ state: "Delaware", Furnishings: 0 });
  });
});

describe("#calculateTotalValuesPerParentRowDimensionPerColumn", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return total values per parent row dimension per column", () => {
    const sum = calculateTotalValuesPerParentRowDimensionPerColumn(
      data.data,
      data.rowDimensions,
      data.columnDimension,
      data.metric,
      data.extraColumn
    )[0];

    expect(sum[0]).toEqual({ state: "California", Furniture: 5 });
    expect(sum[1]).toEqual({ state: "Delaware", Furniture: 0 });
  });
});

describe("#calculateTotalOfAllCellValues", () => {
  let data = initialData;
  beforeEach(() => {
    data = initialize();
  });

  afterEach(() => {
    data = clear();
  });

  it("should return sum of all cell values", () => {
    const res = calculateTotalOfAllCellValues(
      data.data,
      data.rowDimensions,
      data.metric,
      data.extraColumn
    );

    expect(res).toEqual(10);
  });
});
