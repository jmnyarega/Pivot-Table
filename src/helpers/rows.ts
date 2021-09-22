import { Data, RowDimensions } from "../types";

export const getRows = (
  data: Data,
  rowDimensions: RowDimensions,
  extraRows: string
) => {
  const level1 = Array.from(new Set(data.map((d) => d[rowDimensions[0]])));
  const level2 = Array.from(new Set(data.map((d) => d[rowDimensions[1]])));
  return [
    { label: rowDimensions[0], values: level1.concat(extraRows) },
    { label: rowDimensions[1], values: level2 },
  ];
};
