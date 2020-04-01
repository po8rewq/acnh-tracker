import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Input, ButtonGroup } from 'reactstrap';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .btn-group {
    width: 100%;
  }

  .iconContainer {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 3px;
    bottom: 0;
  }
`;

const Search = ({ value, onChange }) => (
  <Wrapper>
    <ButtonGroup>
      <Input type="text" name="search" placeholder="Search" onChange={(e) => onChange(e.target.value)} value={value} />
      <div className="iconContainer" onClick={() => onChange('')}>
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </div>
    </ButtonGroup>
  </Wrapper>
);

export default Search;