import React from 'react';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 30px;
  .progress {
    height: 100%;
  }
`;

const ProgressBar = ({ current, total }) => {
  const value = Math.round(current * 100 / total)
  return <Wrapper>
    <Progress value={value} striped color="warning">
      <strong>{`${value}%`}</strong>
    </Progress>
  </Wrapper>
}

export default ProgressBar;