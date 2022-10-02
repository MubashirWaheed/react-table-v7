

import React,{useState,useEffect,useContext}from "react";
import{Form,FloatingLabel,Button,Col,Row} from 'react-bootstrap'
import DropDownGeneral from '../Utilities/DropDownGeneral';




function UpdateOrderInfo()
{

  const [OrderInfo, setOrderInfo] = useState(
    {created_at: '6/6/21', id: 500, SKU: 500,
    Supplier:'Bob2',Cost_USD:650,Description:'Lorem ipsum dolor sit amet, consectetur liqua. Ac turpis ege',
    PaidSupplier:'Yes',AllowedValuesPaidSupplier:["Yes","No"]
  })
  ;   

   
  

  function handleChange(e) {
    e.preventDefault();
    setOrderInfo((prevOrderInfo) => ({ ...prevOrderInfo, [e.target.id]: e.target.value }));
  }
  
return (
<>

  
<div className="col-sm-3 offset-sm-3"> 

  <Form className="mt-5" onSubmit= {e => { e.preventDefault()} }>



  <FloatingLabel  controlId="floatingInput"  label="Order #" className="mb-3">
    <Form.Control  size="sm" type="text" id="id" placeholder="Order #" onChange={handleChange}/>
  </FloatingLabel>
  
  <FloatingLabel  controlId="floatingInput"  label="Date Sold" className="mb-3">
    <Form.Control  size="sm" type="text" id="created_at" placeholder="Date Sold" value={OrderInfo.created_at} onChange={handleChange}/>
  </FloatingLabel>

  

  <FloatingLabel  controlId="floatingInput"  label="SKU" className="mb-3">
    <Form.Control  size="sm" type="text" id="SKU" placeholder="SKU" value={OrderInfo.SKU} onChange={handleChange}/>
  </FloatingLabel>

  <FloatingLabel  controlId="floatingInput"  label="Supplier" className="mb-3">
    <Form.Control  size="sm" type="text" id="Supplier" placeholder="Supplier" value={OrderInfo.Supplier} onChange={handleChange}/>
  </FloatingLabel>

  <FloatingLabel  controlId="floatingInput"  label="Cost USD" className="mb-3">
    <Form.Control  size="sm" type="text" id="Cost_USD" placeholder="Cost USD" value={OrderInfo.Cost_USD} onChange={handleChange}/>
  </FloatingLabel>

  <FloatingLabel  controlId="floatingInput"  label="Description" className="mb-3">
    <Form.Control  size="sm" type="text" id="Description" placeholder="Description" value={OrderInfo.Description} onChange={handleChange}/>
  </FloatingLabel>

  <div className="mb-3 border border-secondary">
  <Form.Group as={Row} className="mb-3 " controlId="formPlaintextEmail">
    <Form.Label >
     Paid Supplier:
    </Form.Label>
    <Col>
    {/* "DropDownID" is only for the purpose that we can target what attributes we want to influence in the Context */}
    <DropDownGeneral className="me-5" Data={OrderInfo}  SetData={setOrderInfo}  DropDownID ="PaidSupplier" CurrentValue={OrderInfo.PaidSupplier} AllowedValues={OrderInfo.AllowedValuesPaidSupplier} id="PaidSupplier"/>
    </Col>
  </Form.Group>
  </div>


   <div className="mb-3"> 
    <Button className="me-5" size="s" variant="primary" type="submit"  >
         Submit 
    </Button>

    <Button className="me-5" size="s" variant="btn btn-danger" type="submit" >
    Delete Item
    </Button>
    </div>

  </Form>
 </div> 
 </> 
  )
 
}
export default UpdateOrderInfo;
