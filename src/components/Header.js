import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from 'reactstrap';
import AboutModal from './AboutModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  const currentPage = location.pathname === '/' ? '/fish' : location.pathname;

  return (
    <Container>
      <AboutModal show={modal} toggle={toggleModal} />
      <Navbar color="light" light expand="md">
        <NavbarBrand href={process.env.PUBLIC_URL}>AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/#/fish"} active={currentPage === '/fish'}>Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/#/bugs"} active={currentPage === '/bugs'}>Bugs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={process.env.PUBLIC_URL + "/#/fossils"} active={currentPage === '/fossils'}>Fossils</NavLink>
            </NavItem>
          </Nav>
          <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>About</NavLink>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Header;