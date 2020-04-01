import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  input {
    /* Double-sized Checkboxes */
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    padding: 10px;
    margin: 2px;
    cursor: pointer;
  }
`;

const Checkbox = ({ onChange, checked }) => (
  <Wrapper>
    <input type="checkbox" onChange={onChange} checked={checked} />
  </Wrapper>
)

export default Checkbox;