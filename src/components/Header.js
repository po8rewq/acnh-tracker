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

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/fish">Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bugs">Bugs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/fossils">Fossils</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>About</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;