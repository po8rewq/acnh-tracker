import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import AboutModal from './AboutModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  return (
    <div>
      <AboutModal show={modal} toggle={toggleModal} />
      <Navbar color="light" light expand="md">
        <NavbarBrand href={process.env.PUBLIC_URL}>AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + ""}>Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/#/bugs"}>Bugs</NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/#/fossils"}>Fossils</NavLink>
            </NavItem> */}
          </Nav>
          <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>About</NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;