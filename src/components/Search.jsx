import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Input, ButtonGroup } from 'reactstrap';

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  .btn-group {
    width: 100%;
  }

  .iconContainer {
    position: absolute;
    right: 5px;
    top: 3px;
    bottom: 0;
    border: none;
    background: none;
  }
`;

const propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Search = ({ value, onChange }) => (
  <Wrapper>
    <ButtonGroup>
      <Input type="text" name="search" placeholder="Search" onChange={(e) => onChange(e.target.value)} value={value} />
      <button type="button" className="iconContainer" onClick={() => onChange('')}>
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </button>
    </ButtonGroup>
  </Wrapper>
);

Search.propTypes = propTypes;

export default Search;
