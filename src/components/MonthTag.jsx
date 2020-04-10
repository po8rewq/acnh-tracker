import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  background: ${(p) => (p.available ? '#dbd603' : '#f5f5f5')};
  color: ${(p) => (p.available ? '#000' : '#d5cb96')};
  border: ${(p) => (p.available ? 'none' : '1px solid')};
  font-style: italic;
  font-weight: bold;
  text-align: center;
  font-size: .75rem;
  padding: 0 5px;
  border-radius: 3px;
`;

const propTypes = {
  value: PropTypes.string.isRequired,
  available: PropTypes.bool.isRequired,
};

const MonthTag = ({ value, available }) => <Wrapper available={available}>{value}</Wrapper>;

MonthTag.propTypes = propTypes;

export default MonthTag;
