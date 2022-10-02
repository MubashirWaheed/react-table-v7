
function Test()
{

  get_all_suppliers()
  
  async function get_all_suppliers(){
  let result = await fetch((`${process.env.REACT_APP_DATABASE}get_all_suppliers`),{
    method:'GET',
  
  })  
}


return (
  <h1></h1>
  )
}
export default Test;