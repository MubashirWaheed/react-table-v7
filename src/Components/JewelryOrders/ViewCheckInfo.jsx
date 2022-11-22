import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger } from "react-bootstrap";
import CheckBreakdown from "./CheckBreakdown";
import { faMoneyCheckAlt } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-bootstrap/Tooltip";

export default function ViewCheckInfo({ ViewCheckInfoID, id }) {
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
