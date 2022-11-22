import Form from "react-bootstrap/Form";
import React, { useState, useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import { find, findIndex } from "lodash";

function EmaiSupplierPaymentInfo({ id }) {
  const { SalesInfo, setSalesInfo, onEditData, AddNewValueItemsUpdatedArray } =
    useContext(JewelryOrdersInfoContext);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      let field = "EmaiSupplierCheckIsReady";
      let value = checked;
      AddNewValueItemsUpdatedArray(id);
      onEditData({ field, id, value });
    }
  }, [checked]);

  const renderTooltip = (props) => (
    <Tooltip className="button-tooltip" {...props}>
      Click checkbox to email supplier check is ready
    </Tooltip>
  );

  return (
    <div>
      <OverlayTrigger
        placement="bottom"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip}
      >
        <Form>
          <div className="paid_supplier">
            <FontAwesomeIcon icon={faEnvelope} size="1x" />
            <Form.Check onChange={handleChange} />
          </div>
        </Form>
      </OverlayTrigger>
    </div>
  );
}
export default EmaiSupplierPaymentInfo;
