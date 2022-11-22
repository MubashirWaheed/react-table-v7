import React, { useContext } from "react";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import "./JewelryOrdersTable.css";

const EditableCell = ({ value, row, column }) => {
  const { onEditData, AddNewValueItemsUpdatedArray } = useContext(
    JewelryOrdersInfoContext
  );

  const onChange = (e) => {
    console.log("field: column.id", column.id);
    onEditData({
      id: row.values.id,
      field: column.id,
      value: e.target.value,
    });

    AddNewValueItemsUpdatedArray(row.values.id);
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onChange(e);
    }
  };

  return (
    <input
      // style={{ width: "100%" }}
      className="editable-cell"
      defaultValue={value}
      onBlur={onChange}
      onKeyPress={onKeyPress}
      type={column.type}
    />
  );
};

export default EditableCell;
