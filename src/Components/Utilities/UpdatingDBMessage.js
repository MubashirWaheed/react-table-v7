import React, { } from "react";
import { ProgressBar } from "react-bootstrap";


function UpdatingDBMessage()
{


 return (
<div>
     <br/>
      <br/>
      <br/>  
           

  <div className="row">                      
  <p className="col-8 offset-4" style={{  color: "red",fontWeight: 'bold',padding: "10px"}}>
   Updating the DB with the information  <ProgressBar animated now={65}/>
   
   </p> 
 </div>
</div>

  );

}
export default UpdatingDBMessage;
