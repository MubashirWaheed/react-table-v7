import React, { useState, useContext, useEffect } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";

function DropDownGeneral({
  CurrentValue,
  AllowedValuesDropDownType,
  DropDownID,
  field,
  id,
  cell_info,
}) {
  // CurrentValue - Represents the default value for the drop-down as indicated from DB
  // AllowedValuesDropDownType Represents what type of data is allowed for the drop-down
  // DropDownID - Is for the Purpose of knowing what information the drop-down needs to update
  // Field - Represents what type of field were trying to update
  // Data,SetData = Is the data we get from the props
  const {
    onEditData,
    findOriginalID,
    ItemsUpdatedArray,
    setItemsUpdatedArray,
    SalesInfo,
    AddNewValueItemsUpdatedArray,
  } = useContext(JewelryOrdersInfoContext);

  if (cell_info && typeof cell_info.id !== "undefined") {
  }

  const [dropDowTitlel, setDropDowTitlel] = useState();
  {
  }

  const [allowedValuesDropDown, setAllowedValuesDropDown] = useState([]);
  {
    // Represents an array that can be put in to the drop-down
  }

  useEffect(() => {
    setDropDowTitlel(CurrentValue);
  }, []);

  useEffect(() => {
    switch (AllowedValuesDropDownType) {
      case "SupplierList":
        function getAllowedDataDropdown(allowedDataDropdown) {
          if (sessionStorage.hasOwnProperty("allowedDataDropdown")) {
            allowedDataDropdown = JSON.parse(
              sessionStorage.getItem("allowedDataDropdown")
            );
            allowedDataDropdown = allowedDataDropdown.supplierNames;
            setAllowedValuesDropDown(allowedDataDropdown);
          } else {
            // This are default values in case the session is empty
            allowedDataDropdown = ["t1", "t2"];

            // We found that we need to give a delay until
            // we write that allowed drop-down to the state
            // "allowedDataDropdown"
            // otherwise the first time it renders it will not render the table properly
            setAllowedValuesDropDown(allowedDataDropdown);
          }
        }
        setTimeout(getAllowedDataDropdown, 500);

        break;
      case "YesNo":
        setAllowedValuesDropDown(["Yes", "No"]);
        break;

      case "PaymentMethodTable":
        setAllowedValuesDropDown(["Check", "Cash"]);

        break;
      default:
        setAllowedValuesDropDown(["D1", "D2"]);
    }
  }, []);

  return (
    <div>
      <DropdownButton
        size="sm"
        id="dropdown-basic-button"
        title={dropDowTitlel}
        DropDownID={DropDownID}
      >
        {allowedValuesDropDown.map((allowedValuesDropDown) => {
          return (
            <Dropdown.Item
              eventKey={allowedValuesDropDown}
              value={allowedValuesDropDown}
              onClick={() => {
                setDropDowTitlel(allowedValuesDropDown);
                onEditData({ field, id, value: allowedValuesDropDown });
                findOriginalID(id);
              }}
            >
              {allowedValuesDropDown}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
}
export default DropDownGeneral;
