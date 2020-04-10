import React from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  input, div {
    flex: 1;
  }
`;

const propTypes = {
  onChange: PropTypes.func.isRequired,
  currentWeek: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const SundayPriceForm = ({ onChange, currentWeek, value }) => (
  <Wrapper>
    <div>
      Daisy Mae&apos;s Turnip price in your town on&nbsp;
      <strong>
        Sunday
        {dayjs(currentWeek).format('DD MMMM YYYY')}
      </strong>
    </div>
    <Input
      type="number"
      name="sundayPrice"
      id="sundayPrice"
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  </Wrapper>
);

SundayPriceForm.propTypes = propTypes;

export default SundayPriceForm;
