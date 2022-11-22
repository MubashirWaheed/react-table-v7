import DropDownGeneral from "../Utilities/DropDownGeneral";
import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import Tooltip from "react-bootstrap/Tooltip";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger } from "react-bootstrap";

// import ViewCheckInfo from "./ViewCheckInfo";

function PaymentMethodTable({ id }) {
  //   We pulled from the SalesInfo via ID the obj that we are looking for
  const { SalesInfo } = useContext(JewelryOrdersInfoContext);

  // we have to get the obj value here as well to determine whether to show check or not
  // const obj = find(SalesInfo, { id: id });
  const obj = {
    PaymentType: "Check",
    CheckRegular: 10,
    CheckVat: 1,
  };

  return (
    <>
      <DropDownGeneral
        CurrentValue={obj.PaymentType}
        AllowedValuesDropDownType="PaymentMethodTable"
        DropDownID={id}
        field="PaymentType"
        id={id}
      />

      {/* cleaner way  */}
      {obj.PaymentType === "Check" && (
        <ViewCheckInfo ViewCheckInfoID="Eli" id={id} />
      )}

      {/* {obj.PaymentType === "Check" ? (
        <ViewCheckInfo ViewCheckInfoID="Eli" id={id} />
      ) : (
        <div></div>
      )} */}
    </>
  );
}

function CheckBreakdown({ id }) {
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

function ViewCheckInfo({ ViewCheckInfoID, id }) {
  const [checkBreakdownToolTipText, setCheckBreakdownToolTipText] = useState();
  const [showCheckBreakdown, setShowCheckBreakdown] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip {...props}>{checkBreakdownToolTipText}</Tooltip>
  );

  useEffect(() => {
    if (showCheckBreakdown === false) {
      setCheckBreakdownToolTipText("Click to view check breakdown");
    } else {
      setCheckBreakdownToolTipText("Click to hide check breakdown");
    }
  }, [showCheckBreakdown]);
  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <button
          className="button-solid"
          onClick={() =>
            showCheckBreakdown === false
              ? setShowCheckBreakdown(true)
              : setShowCheckBreakdown(false)
          }
        >
          {" "}
          <FontAwesomeIcon icon={faMoneyCheckAlt} size="1x" id={id} />{" "}
        </button>
      </OverlayTrigger>
      {/* NO need to return emty div when showCheckBreakdown is false  */}
      {/* {showCheckBreakdown === true ? <CheckBreakdown id={id} /> : <div></div>} */}

      {/* instead do this and looks cleaner*/}
      {showCheckBreakdown && <CheckBreakdown id={id} />}
    </div>
  );
}
export default PaymentMethodTable;
