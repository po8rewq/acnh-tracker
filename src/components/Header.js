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
        <NavbarBrand href="acnh-tracker">AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={"/acnh-tracker/fish"}>Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/acnh-tracker/bugs"}>Bugs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={"/acnh-tracker/fossils"}>Fossils</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>About</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;