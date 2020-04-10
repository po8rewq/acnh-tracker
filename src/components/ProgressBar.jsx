import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 30px;
  .progress {
    height: 100%;
  }
`;

const propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

const ProgressBar = ({ current, total }) => {
  const value = Math.round((current * 100) / total);
  return (
    <Wrapper>
      <Progress value={value} striped color="warning">
        <strong>{`${value}%`}</strong>
      </Progress>
    </Wrapper>
  );
};

ProgressBar.propTypes = propTypes;

export default ProgressBar;
