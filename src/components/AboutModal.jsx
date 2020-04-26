import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  toggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

const AboutModal = ({ toggle, show }) => (
  <Modal isOpen={show} toggle={toggle} size="lg">
    <ModalHeader toggle={toggle}>About</ModalHeader>
    <ModalBody>
      <p>
        This project is open source, and you can find the code on&nbsp;
        <a href="https://github.com/po8rewq/acnh-tracker" rel="noopener noreferrer" target="_blank">GitHub</a>
        . Feel free to report issues, suggest features, or even submit a pull request.
      </p>
      <p>
        All information is compiled from:
        <ul>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://animalcrossing.fandom.com/wiki/Fish_(New_Horizons)
            </a>
          </li>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://animalcrossing.fandom.com/wiki/Bugs_(New_Horizons)
            </a>
          </li>
          <li>
            <a
              href="https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)"
              rel="noopener noreferrer"
              target="_blank"
            >
              https://animalcrossing.fandom.com/wiki/Fossils_(New_Horizons)
            </a>
          </li>
        </ul>
      </p>
      <p>
        Other projects:
        <ul>
          <li>
            {' '}
            Idea based on&nbsp;
            <a
              href="https://github.com/mikebryant/ac-nh-turnip-prices"
              rel="noopener noreferrer"
              target="_blank"
            >
              ac-nh-turnip-prices
            </a>
          </li>
        </ul>
      </p>
      <p>Animal Crossing and Nintendo are registered trademarks of Nintendo of America.</p>
    </ModalBody>
    <ModalFooter>
      <Button color="secondary" onClick={toggle}>Close</Button>
    </ModalFooter>
  </Modal>
);

AboutModal.propTypes = propTypes;

export default AboutModal;
