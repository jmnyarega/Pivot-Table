import { formatCamelCaseHeaders, formatNumber } from "../../helpers/format";

describe("#formatNumber", () => {
  it("should format numbers correctly", () => {
    expect(formatNumber(9000)).toEqual("9,000");
    expect(formatNumber(0)).toEqual("0");
    expect(formatNumber(-200)).toEqual("-200");
    expect(formatNumber(NaN)).toEqual("0");
  });
});

describe("#formatCamelCaseHeaders", () => {
  it("should format string correctly", () => {
    expect(formatCamelCaseHeaders("subCategory")).toEqual("sub-Category");
    expect(formatCamelCaseHeaders("Sub")).toEqual("Sub");
    expect(formatCamelCaseHeaders("category")).toEqual("category");
    expect(formatCamelCaseHeaders("CATEGORY")).toEqual("CATEGORY");
  });
});
