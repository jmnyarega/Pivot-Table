# Pivot Table
  - Pivot table component built using ReactJs

### System prerequisites
  - nodejs v10 or later
  - yarn

### How to run the application locally on your machine
  - Clone the repository - `git clone git@github.com:josiahmokob0/Pivot-Table.git`
  - Checkout to the root directory of the app - `cd Pivot-Table`
  - Download all the required packages for the application to run - `yarn install` or `npm install`
  - To run the application - `yarn start` or `npm start`
	
### General Requirements
  - The pivot table should not be tied to a specific data.
  - Dimensions should be configurable
  - Multiple dimensions should be supported

### Architectural overview

 - PivotTable is essentially a component that is comprised of smaller components:
  
```yaml
  PivotTable
     - LeftTable
	- TableHeader
	- TableRows
     - RightTable
	- TableHeader
	- TableRows
```
  
#### PivotTable Component
  - This is the parent component of the app. It allows us to configure us to configure the pivotTable with the
    following options(props)
     - rowDimensions - of type `Array`
     - columnDimension - of type `string`
     - metric - of type `string`
     - dataset - of type `Array of Objects`
     - title - of type `string`
     - styles - If you wish to override the component's styles `Object`

#### LeftTable Component
   - The LeftTable component is generated from `rowDimensions`
   - This components will have row _labels_ on the left of the component
   - The component will accept the following options ( props):
        - rowDimensions - of type `Array`
        - rows - of type `Array of Objects`
        - title - of type `String`

#### RightTable Component
   - This components contains aggregated data values that is populated into cells
   - The component will accept the following options ( props):
         rowDimensions - of type `Array`
         columnDimension - of type `String`
         rows - of type `Array of Objects`
         columns - of type `Array`

#### Folder structure of the application

```
.
└── /src
    └── /pivotTable
	└── /LeftTable
	|   ├── TableHeader
	|   ├── TableRows
	 ── /RightTable
	|   ├── TableHeader
	|   └── TableRows
        /types
        /data
        /__tests
        /helpers
        App.tsx
```

#### Assumptions
   - The component only supports two rowDimensions at the moment
   - One aggregator is supported - SUM
   - Typescript does most* of the testing hence few tests writted
   - The component won't recieve a large dataset i.e 1GB
   - We won't have may rowDimensions - more than two

#### Next steps
   - Support more than 2 row dimensions
   - Write more tests - for both UI & helper 
   - Support multiple aggregators - sum, average, mean etc
   - Allow users to select which aggregator they want to use
   - Allow users to select row and column dimensions
   - Support other methods of data presentation i.e barcharts etc
   - Support multiple data formats
   - Support drag & drop feature
