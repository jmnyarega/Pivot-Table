type DataObject = {
  country?: string;
  state?: string;
  category?: string;
  subCategory?: string;
  sales?: number;
  extraColumn?: string;
};

interface IData {
  rowDimensions: string[];
  columnDimension: string;
  extraColumn: string;
  data: DataObject[];
  metric: string;
}

export const initialData: IData = {
  rowDimensions: [""],
  extraColumn: "",
  columnDimension: "",
  metric: "",
  data: [],
};

export const initialize = (): any => ({
  columnDimension: "state",
  rowDimensions: ["category", "subCategory"],
  extraColumn: "Total",
  metric: "quantity",
  data: [
    {
      country: "United States",
      state: "California",
      category: "Furniture",
      subCategory: "Furnishings",
      sales: 47000.04,
      quantity: 5,
    },
    {
      country: "United States",
      city: "Wilmington",
      state: "Delaware",
      category: "Technology",
      subCategory: "Phones",
      sales: 30.84,
      quantity: 5,
    },
  ],
});

export const clear = (): IData => ({
  columnDimension: "",
  rowDimensions: [""],
  extraColumn: "",
  metric: "",
  data: [],
});
