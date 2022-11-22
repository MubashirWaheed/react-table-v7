import React, { useState, useContext, useEffect, useRef } from "react";
import { Form } from "react-bootstrap";
import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";

function DescriptionField({ DBValue, id }) {
  // Copied your working descrition componet code here
  const { AddNewValueItemsUpdatedArray, onEditData } = useContext(
    JewelryOrdersInfoContext
  );
  const [description, setDescription] = useState(DBValue);

  const initialRender = useRef(true);

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(
    () => {
      // We are not interested to use the useEffect in the initial render of the page
      // it is an unnecessary render that also fires
      //  AddNewValueItemsUpdatedArray for all items

      // We use initialRender to decide if it is the first render

      if (initialRender.current) {
        initialRender.current = false;
      } else {
        AddNewValueItemsUpdatedArray(id);
        // We are using a debounce
        // strategy because the call to  onEditData is costly and we do not want to change the
        //  information on the state for each letter typed only after 2000 ms

        // Wait 2000ms before copying the value of CheckRegular in to onEditData;
        const timeout = setTimeout(() => {
          let field = "Description";
          let value = description;
          onEditData({ field, id, value });
        }, 2000);

        // If the hook is called again, cancel the previous timeout
        // This creates a debounce instead of a delay
        return () => clearTimeout(timeout);
      }
    },

    // Run the hook every time the user makes a keystroke
    [description]
  );

  return (
    <div>
      <Form.Control
        as="textarea"
        rows={3}
        value={description}
        onChange={handleChange}
      />
    </div>
  );
}
export default DescriptionField;
