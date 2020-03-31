import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href={process.env.PUBLIC_URL}>AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/fish"}>Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/bugs"}>Bugs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/fossils"}>Fossils</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>About</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;