import DropDownGeneral from "../Utilities/DropDownGeneral";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import { find } from "lodash";

function PaymentMethodTable({ id }) {
  // The whole idea of this component is for payment method
  // if payment method is  a check there will be an option for the user to see the check breakdown
  // if he clicks on the check icon
  // otherwise user will not get to view check info

  const obj = {
    PaymentType: "Check",
    CheckRegular: 10,
    CheckVat: 1,
  };

  const { SalesInfo, AddNewValueItemsUpdatedArray, onEditData } = useContext(
    JewelryOrdersInfoContext
  );

  const [showCheckBreakdown, setShowCheckBreakdown] = useState(false);
  {
    // If is set to true the UI will show in the table the breakdown of the checks
  }

  const [checkBreakdownToolTipText, setCheckBreakdownToolTipText] = useState();
  {
  }

  useEffect(() => {
    if (showCheckBreakdown === false) {
      setCheckBreakdownToolTipText("Click to view check breakdown");
    } else {
      setCheckBreakdownToolTipText("Click to hide check breakdown");
    }
  }, [showCheckBreakdown]);

  //   We pulled from the SalesInfo via ID the obj that we are looking for

  // Commmented by mubashir
  // const obj = find(SalesInfo, { id: id });

  const renderTooltip = (props) => (
    <Tooltip {...props}>{checkBreakdownToolTipText}</Tooltip>
  );

  function ViewCheckInfo() {
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
        {showCheckBreakdown === true ? <CheckBreakdown /> : <div></div>}
      </div>
    );
  }

  function CheckBreakdown() {
    const [checkInfo, setCheckInfo] = useState({
      // Commented by mubashir
      // CheckRegular: obj.CheckRegular,
      // CheckVat: obj.CheckVat,
    });

    // This a helper to store for useEffect that updates the information on Context
    // We want to know what field to update on Context

    const [activeField, setActiveField] = useState([]);

    useEffect(
      () => {
        // commented by mubahsir
        // AddNewValueItemsUpdatedArray(id);
        //
        //
        // We are using a debounce
        // strategy because the call to  onEditData is costly and we do not want to change the
        //  information on the state for each letter typed only after 2000 ms

        // Wait 2000ms before copying the value of CheckRegular in to onEditData;
        const timeout = setTimeout(() => {
          let field = activeField;
          let value = checkInfo[activeField];
          onEditData({ field, id, value });
        }, 2000);

        // If the hook is called again, cancel the previous timeout
        // This creates a debounce instead of a delay
        return () => clearTimeout(timeout);
      },
      // Run the hook every time the user makes a keystroke
      [checkInfo]
    );

    // probably something is messed here

    const handleChange = (e) => {
      const fieldName = e.target.getAttribute("field");

      setActiveField(fieldName);

      setCheckInfo((existingValues) => ({
        // Retain the existing values

        ...existingValues,

        // update the current field

        [fieldName]: e.target.value,
      }));
    };

    return (
      <div className="inPutSalesTable">
        <div>
          <Form.Label htmlFor="regularCheck#">Regular check #</Form.Label>
          <Form.Control
            type="text"
            id="regularCheck#"
            value={checkInfo.CheckRegular}
            field="CheckRegular"
            onChange={handleChange}
          />
        </div>
        <div>
          <Form.Label htmlFor="vatCheck#">Vat check #</Form.Label>
          <Form.Control
            value={checkInfo.CheckVat}
            type="text"
            id="vatCheck#"
            field="CheckVat"
            onChange={handleChange}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <DropDownGeneral
        // CurrentValue={2}
        CurrentValue={obj.PaymentType}
        AllowedValuesDropDownType="PaymentMethodTable"
        DropDownID={id}
        field="PaymentType"
        id={id}
      />
      {obj.PaymentType === "Check" && <ViewCheckInfo ViewCheckInfoID="Eli" />}
      {/* {obj.PaymentType === "Check" ? (
        <ViewCheckInfo ViewCheckInfoID="Eli" />
      ) : (
        <div></div>
      )} */}
    </>
  );
}
export default PaymentMethodTable;
