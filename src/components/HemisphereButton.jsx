import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  callback: PropTypes.func.isRequired,
};

const HemisphereButton = ({ hemisphere, callback }) => {
  const toggle = (value) => {
    if (value !== hemisphere) {
      callback(value);
    }
  };
  return (
    <ButtonGroup>
      <Button
        disabled={hemisphere === 'northern'}
        color={hemisphere === 'northern' ? 'primary' : 'link'}
        onClick={() => toggle('northern')}
      >
        Northern Hemisphere
      </Button>
      <Button
        disabled={hemisphere === 'southern'}
        color={hemisphere === 'southern' ? 'primary' : 'link'}
        onClick={() => toggle('southern')}
      >
        Southern Hemisphere
      </Button>
    </ButtonGroup>
  );
};

HemisphereButton.propTypes = propTypes;

export default HemisphereButton;
