type DataObject = {
  country?: string;
  state?: string;
  category?: string;
  subCategory?: string;
  sales?: number;
  extraColumns?: string;
};

interface IData {
  rowDimensions: string[];
  columnDimension: string;
  extraColumns: string;
  data: DataObject[];
  metric: string;
}

export const initialData: IData = {
  rowDimensions: [""],
  extraColumns: "",
  columnDimension: "",
  metric: "sales",
  data: [],
};

export const initialize = (): any => ({
  columnDimension: "state",
  rowDimensions: ["category", "subCategory"],
  extraColumns: "Total",
  metric: "sales",
  data: [
    {
      country: "United States",
      state: "California",
      category: "Furniture",
      subCategory: "Furnishings",
      sales: 47000.04,
    },
    {
      country: "United States",
      city: "Wilmington",
      state: "Delaware",
      category: "Office Supplies",
      subCategory: "Binders",
      sales: 30.84,
    },
  ],
});

export const clear = (): IData => ({
  columnDimension: "",
  rowDimensions: [""],
  extraColumns: "",
  metric: "",
  data: [],
});
