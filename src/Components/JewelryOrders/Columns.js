import React from "react";
import DropDownGeneral from "../Utilities/DropDownGeneral";
import PaymentMethodTable from "./PaymentMethodTable.example.";
import PhotoJewelryTable from "./PhotoJewelryTable";
import EmaiSupplierPaymentInfo from "./EmaiSupplierPaymentInfo";
import DescriptionField from "./DescriptionField";

export const COLUMNS = [
  {
    Header: "Date Sold",
    accessor: "created_at",
    type: "text",
    // desired width for each column
    maxWidth: 175,
    minWidth: 100,
    width: 120,
  },

  {
    Header: "Order#",
    accessor: "id",
    type: "text",
    maxWidth: 100,
    minWidth: 55,
    width: 75,
  },

  {
    Header: "SKU",
    accessor: "SKU",
    type: "number",
    maxWidth: 150,
    minWidth: 75,
    width: 100,
  },

  {
    Header: "Photo",
    Cell: (cell) => <PhotoJewelryTable id={cell.row.values.id} />,
    maxWidth: 150,
    minWidth: 100,
    width: 120,
  },

  // {
  //   Header: "Supplier",
  //   accessor: "Supplier",
  // maxWidth: 150,
  //   minWidth: 75,
  //   width: 100,
  //   Cell: (cell) => (
  //     <DropDownGeneral
  //       CurrentValue={cell.value}
  //       AllowedValuesDropDownType="SupplierList"
  //       DropDownID={cell.row.values.id}
  //       field="Supplier"
  //       id={cell.row.values.id}
  //       cell_info={cell.row.values}
  //     />
  //   ),
  // },

  {
    Header: "Cost $",
    accessor: "Cost_USD",
    type: "number",
    maxWidth: 100,
    minWidth: 50,
    width: 75,
  },
  {
    Header: "Description",
    accessor: "Description",
    type: "text",
    Cell: (cell) => <DescriptionField value={cell.row.values} />,
    maxWidth: 250,
    minWidth: 150,
    width: 200,
  },

  // commneted for tesing purpose
  // {
  //   Header: "Paid Supplier",
  //   accessor: "PaidSupplier",
  // maxWidth: 150,
  //   minWidth: 75,
  //   width: 100,

  //   Cell: (cell) => (
  //     <div className="paid_supplier">
  //       <DropDownGeneral

  //         CurrentValue={cell.value}
  //         AllowedValuesDropDownType="YesNo"
  //         DropDownID={cell.row.values.id}
  //         field="PaidSupplier"
  //         id={cell.row.values.id}
  //       />

  //       <EmaiSupplierPaymentInfo id={cell.row.values.id} />
  //     </div>
  //   ),

  // },

  {
    Header: "Paid supplier ₪",
    accessor: "Amount_paid_supplier_ILS",
    type: "number",
    maxWidth: 150,
    minWidth: 75,
    width: 100,
  },

  {
    Header: "VAT Paid supplier ₪",
    accessor: "VATPaidSupplierILS",
    type: "number",
    maxWidth: 150,
    minWidth: 75,
    width: 100,
  },

  {
    Header: "Payment method",
    Cell: (cell) => <PaymentMethodTable id={cell.row.values.id} />,
    accessor: "payment",
    maxWidth: 150,
    minWidth: 75,
    width: 100,
  },
];
