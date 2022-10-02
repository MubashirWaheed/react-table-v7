import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'





function Header() {
  let user = JSON.parse(localStorage.getItem('user-info'))
  const history = useHistory();
  function logOut() {
    localStorage.clear()
    history.push("/register")
  }



  return (

    <Navbar bg="primary" variant="dark" className="LogoNavSlogan" expand="lg">



      <Navbar.Brand href="#home"  >
        <FontAwesomeIcon icon={faCoins} className="flex-item-nav" />
        <div className="flex-item-nav">Mr Sales</div>


      </Navbar.Brand>


      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto flex-item-nav">
          <Nav.Link href="Sales">Sales</Nav.Link>
          <Nav.Link href="jewelry_orders">Jewelry orders</Nav.Link>
          <Nav.Link href="upload_csv">Upload CSV</Nav.Link>
          <Nav.Link href="update_order_info">Update Order Info</Nav.Link>
          <Nav.Link href="test">test</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>

    </Navbar>


  )


}

export default Header