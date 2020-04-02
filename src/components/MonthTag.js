import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${p => p.available ? '#dbd603' : '#f5f5f5'};
  color: ${p => p.available ? '#000' : '#d5cb96'};
  border: ${p => p.available ? 'none' : '1px solid'};
  font-style: italic;
  font-weight: bold;
  text-align: center;
  font-size: .75rem;
  padding: 0 5px;
`;

const MonthTag = ({ value, available }) => <Wrapper available={available}>{value}</Wrapper>

export default MonthTag;