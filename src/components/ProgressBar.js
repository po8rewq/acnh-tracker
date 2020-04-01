import React from 'react';
import { Progress } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 30px;
  margin-bottom: 15px;

  .progress {
    height: 100%;
  }
`;

const ProgressBar = ({ current, total }) => {
  const value = Math.round(current * 100 / total)
  return <Wrapper>
    <Progress value={value} color="warning">
      {`${value}%`}
    </Progress>
  </Wrapper>
}

export default ProgressBar;