import { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import { find } from "lodash";

export default function CheckBreakdown({ id }) {
  const { SalesInfo, AddNewValueItemsUpdatedArray, onEditData } = useContext(
    JewelryOrdersInfoContext
  );
  const [fieldID, setFieldID] = useState([]);
  const [activeField, setActiveField] = useState([]);

  // initial value for obj will come from the below line instead of hard codded obj value
  // const obj = find(SalesInfo, { id: id });
  let obj = {
    PaymentType: "Check",
    CheckRegular: 10,
    CheckVat: 1,
  };

  const [checkInfo, setCheckInfo] = useState({
    CheckRegular: obj.CheckRegular,
    CheckVat: obj.CheckVat,
  });

  useEffect(() => {
    AddNewValueItemsUpdatedArray(id);

    const timeout = setTimeout(() => {
      const field = activeField;

      try {
        // If you are storing the check input value in the checkInfo
        // then why are again geting the html form element using querySelector?
        // I don't think there is any need for that I used checkInfo directly
        // let value = document.querySelector(`[fieldId=${fieldID}]`).value;
        let value = checkInfo;
        // will display the data sent to the db
        console.log("VALUE: ", value);

        onEditData({ field, id, value });
      } catch (error) {
        console.log(error);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [checkInfo]);

  const handleChange = (e) => {
    const fieldName = e.target.getAttribute("field");
    setActiveField(fieldName);
    // open chrome/firefox console by pressing ctrl+shift+i to see the fieldId and field name
    console.log("fieldName: ", fieldName);
    const fieldID = fieldName + id;
    setFieldID(fieldID);
    console.log("fieldID: ", fieldID);
    setCheckInfo((existingValues) => ({
      ...existingValues,
      [fieldID]: e.target.value,
    }));
  };

  return (
    <div className="inPutSalesTable">
      <div>
        <Form.Label htmlFor="regularCheck#">Regular check #</Form.Label>
        <Form.Control
          // dynamically adding id to the input field
          id={`CheckRegular${id}`}
          // id="regularCheck#"
          type="text"
          value={checkInfo[`CheckRegular${id}`]}
          field="CheckRegular"
          onChange={handleChange}
        />
      </div>

      <div>
        <Form.Label htmlFor="vatCheck#">Vat check #</Form.Label>
        <Form.Control
          id={`CheckVat${id}`}
          value={checkInfo[`CheckVat${id}`]}
          type="text"
          field="CheckVat"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
