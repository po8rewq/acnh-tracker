import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AboutModal = ({ toggle, show = false }) => (
  <Modal isOpen={show} toggle={toggle}>
    <ModalHeader toggle={toggle}>About</ModalHeader>
    <ModalBody>
      <p>
        This project is open source, and you can find the code on <a href="https://github.com/po8rewq/acnh-tracker" rel="noopener noreferrer" target="_blank">GitHub</a>. Feel free to report issues, suggest features, or even submit a pull request. Help support this project financially by donating—every little bit helps!
      </p>
      <p>
        All information is compiled from:
        <ul>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)</a>
          </li>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)</a>
          </li>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)</a>
          </li>
        </ul>
      </p>
      {/* <p>
        <h1>Privacy Policy</h1>

      </p> */}
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Close</Button>
    </ModalFooter>
  </Modal>
);

export default AboutModal;