import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { find } from "lodash";

export const JewelryOrdersInfoContext = createContext();

export function JewelryOrdersContextProvider({ children }) {
  const [SalesInfo, setSalesInfo] = useState([]);

  //Is the allowed data for a particular
  // attribute to be used later in a dropbox information
  const [allowedData, setAllowedData] = useState([]);

  // We want to keep track of the items that we updated information for
  // because we dont to update all the table in the DB only for items that at least one of the cells of the data
  // information has changed

  const [ItemsUpdatedArray, setItemsUpdatedArray] = useState([]);

  async function fetchData() {
    const result = await fetch(`${process.env.REACT_APP_DATABASE}sales`);

    const parsedResult = await result.json();

    const Orders = parsedResult.Orders;
    // setSalesInfo(Orders)

    setSalesInfo([]);

    // We are adding for the drop-down menus allowed values
    // in Colummns via session storage
    // because we weren't able to find a different way to pass these values to Colummns

    sessionStorage.setItem(
      "allowedDataDropdown",
      JSON.stringify(parsedResult.allowedData)
    );
  }
  useEffect(() => {
    fetchData();
  }, []);

  const onEditData = useCallback(({ id, field, value }) => {
    setSalesInfo((data) => {
      return data.map((record) => {
        if (record.id === id) {
          return { ...record, [field]: value };
        }
        return record;
      });
    });
  }, []);

  const findOriginalID = (id) => {
    // The purpose of this function is to find the original id
    // based on the ID because later on we use it for
    // AddNewValueItemsUpdatedArray

    var obj = find(SalesInfo, { id: id });
    var original_id = obj["original_id"];
    AddNewValueItemsUpdatedArray(original_id);
  };

  const AddNewValueItemsUpdatedArray = (ItemAdded) => {
    let TempItemsUpdatedArray = ItemsUpdatedArray;
    // We are only interested to add this to the Array if it does not exist already
    // otherwise when updating DB we will be working twice as hard
    let index = TempItemsUpdatedArray.indexOf(ItemAdded);
    if (index < 0) {
      TempItemsUpdatedArray.push(ItemAdded);
      setItemsUpdatedArray(TempItemsUpdatedArray);
    }
  };

  return (
    <JewelryOrdersInfoContext.Provider
      value={{
        SalesInfo,
        onEditData,
        ItemsUpdatedArray,
        setItemsUpdatedArray,
        AddNewValueItemsUpdatedArray,
        allowedData,
        findOriginalID,
      }}
    >
      {children}
    </JewelryOrdersInfoContext.Provider>
  );
}

export default JewelryOrdersContextProvider;
