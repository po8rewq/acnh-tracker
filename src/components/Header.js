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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';
import AboutModal from './AboutModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const location = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  const pathname = location.pathname.split('/')[1]
  const currentPage = pathname || 'fish';

  return (
    <Container>
      <AboutModal show={modal} toggle={toggleModal} />
      <Navbar color="light" light expand="md">
        <NavbarBrand href={process.env.PUBLIC_URL}>AC:NH tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={`${process.env.PUBLIC_URL}/#/fish`} active={currentPage === 'fish'}>Fish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`${process.env.PUBLIC_URL}/#/bugs`} active={currentPage === 'bugs'}>Bugs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`${process.env.PUBLIC_URL}/#/fossils`} active={currentPage === 'fossils'}>Fossils</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar active={currentPage === 'diy'}>
              <DropdownToggle nav caret >
                Seasonal recipes
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href={`${process.env.PUBLIC_URL}/#/diy/bunny_day`}>
                  Bunny Day
                </DropdownItem>
                <DropdownItem href={`${process.env.PUBLIC_URL}/#/diy/cherry_blossom`}>
                  Cherry-blossom
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink href={`${process.env.PUBLIC_URL}/#/turnips`} active={currentPage === 'turnips'}>Turnips</NavLink>
            </NavItem>
          </Nav>
          <NavLink style={{ cursor: "pointer" }} onClick={toggleModal}>About</NavLink>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default Header;