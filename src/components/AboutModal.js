import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AboutModal = ({ toggle, show = false }) => (
  <Modal isOpen={show} toggle={toggle}>
    <ModalHeader toggle={toggle}>About</ModalHeader>
    <ModalBody>
      <p>
        All information is compiled from:
        <ul>
          <li>
            <Button
              color="link"
              href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)
          </Button>
          </li>
          <li>
            <Button
              color="link"
              href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)
          </Button>
          </li>
        </ul>
      </p>
      <p>The project is hosted on <a href="https://github.com/po8rewq/acnh-tracker" rel="noopener noreferrer" target="_blank">github</a>.</p>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default AboutModal;