import React, { useContext } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { SalesInfoContextNet } from "../../Context/SalesInfoContextNet";


function YesNoDropDownTable({ DBvalue, field, id }) {
  const { onEditData, findOriginalID, ItemsUpdatedArray, setItemsUpdatedArray, SalesInfo, AddNewValueItemsUpdatedArray } = useContext(SalesInfoContextNet);

  return (
    <div>
      <DropdownButton
        defaultValue={DBvalue}
        size="sm"
        variant="secondary"
        title={DBvalue}

      >
        <Dropdown.Item
          onClick={() => {
            onEditData({ field, id, value: "Yes" })
            findOriginalID(id)

          }}
          value="Yes"
        >
          Yes
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            onEditData({ field, id, value: "No" });
            findOriginalID(id)

          }}
          value="No"
        >
          No
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}
export default YesNoDropDownTable;
