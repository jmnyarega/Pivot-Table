import { Data, RowDimensions } from "../types";

export const getRows = (
  data: Data,
  rowDimensions: RowDimensions,
  extraRows: string
) =>
  rowDimensions.map((value: string, i: number) => ({
    label: value,
    values:
      i === 0
        ? Array.from(new Set(data.map((d) => d[value]))).concat(extraRows)
        : Array.from(new Set(data.map((d) => d[value]))),
  }));

export const rowLevels = (
  data: Data,
  rowDimensions: RowDimensions,
  level: string
) => {
  let res: any = {};
  for (let index = 0; index < rowDimensions.length; index++) {
    res[`level${index + 1}`] =
      index === 0 && rowDimensions.length - 1 > index
        ? data.find((d) => d[rowDimensions[index + 1]] === level)[
            rowDimensions[0]
          ]
        : level;
  }
  return res;
};
