import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
// import useLocalStorage from '../hooks/useLocalStorage';

const HemisphereButton = ({ hemisphere, callback }) => {
  const toggle = (value) => {
    if (value !== hemisphere) {
      callback(value)
    }
  }
  return (
    <ButtonGroup>
      <Button
        disabled={hemisphere === 'northern'}
        color={hemisphere === 'northern' ? 'success' : 'link'}
        onClick={() => toggle('northern')}>Northern Hemisphere</Button>
      <Button
        disabled={hemisphere === 'southern'}
        color={hemisphere === 'southern' ? 'success' : 'link'}
        onClick={() => toggle('southern')}>Southern Hemisphere</Button>
    </ButtonGroup>
  )
}

export default HemisphereButton;