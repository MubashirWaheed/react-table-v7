import React, { createContext, useState } from 'react';


export const AlertAcrossApplicationContext = createContext();

const AlertAcrossApplicatioProvider = (props) => {
  
  const [showAlert, setShowAlert] = useState(false);
  const [variantAlert, setVariantAlert] = useState([]);
  const [alertHeading, setAlertHeading] = useState([]);
  const [alertText, setAlertText] = useState([]);



  return (
    <AlertAcrossApplicationContext.Provider 
      

    value={{ showAlert: [showAlert, setShowAlert], variantAlert: [variantAlert, setVariantAlert],
        alertHeading: [alertHeading, setAlertHeading],alertText: [alertText, setAlertText]}}
    >

{props.children}
    </AlertAcrossApplicationContext.Provider>
  );


}


export default AlertAcrossApplicatioProvider;
