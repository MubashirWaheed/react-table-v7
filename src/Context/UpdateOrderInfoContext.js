// The purpose of this context is for learning only we can achieve the same behavior with
// props drilling

import React, { createContext, useState } from 'react';

export const UpdateOrderInfoContext = createContext();

const UpdateOrderInfoProvider = (props) => {
  

  const [OrderInfo, setOrderInfo] = useState(
    {created_at: '6/6/21', id: 500, SKU: 500,
    Supplier:'Bob2',Cost_USD:650,Description:'Lorem ipsum dolor sit amet, consectetur liqua. Ac turpis ege',
    PaidSupplier:'Yes',AllowedValuesPaidSupplier:["Yes","No"]
  })
  ;  


  return (
    < UpdateOrderInfoContext.Provider value={[OrderInfo, setOrderInfo]}>
      {props.children}
    </ UpdateOrderInfoContext.Provider>
  );


}


export default UpdateOrderInfoProvider;