import { JewelryOrdersInfoContext } from "../../Context/JewelryOrdersContext";
import { find } from "lodash";
import React, { useContext, useEffect, useState } from "react";

function PhotoJewelryTable({ id }) {
  const { SalesInfo } = useContext(JewelryOrdersInfoContext);
  const obj = find(SalesInfo, { id: id });

  const [photo, setPhoto] = useState(
    // "https://www.caratsdirect2u.com/v/canon-photos/Stocks/default_photo_for_items.png"
    // commented becuase of testing purposes
    "https://random.imagecdn.app/150/150"
  );

  // commented becuase of testing purposes
  // uncomment when using with backend
  useEffect(() => {
    // let img = obj.ItemUrl;
    // console.log(img);
    // if (img !== null && img.length > 2) {
    //   setPhoto(obj.ItemUrl);
    // }
  }, []);

  return (
    <div>
      <img
        className="photo_jewelry_table"
        src={photo}
        alt="Italian Trulli"
      ></img>
    </div>
  );
}
export default PhotoJewelryTable;
