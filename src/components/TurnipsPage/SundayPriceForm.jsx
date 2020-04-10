import React from 'react';
// import styled from 'styled-components';
import {
  Input, Row, Col, FormGroup, Label, Container,
} from 'reactstrap';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool,
  currentWeek: PropTypes.string,
  value: PropTypes.number,
};

const defaultProps = {
  value: '',
  isFirstTime: false,
  currentWeek: null,
};

const SundayPriceForm = ({
  onChange, currentWeek, value, isFirstTime,
}) => {
  const renderDate = () => (
    <strong>
      Sunday
      {dayjs(currentWeek).format('DD MMMM YYYY')}
    </strong>
  );

  return (
    <Container>
      <Row>
        <Col sm="12" md="6">
          Daisy Mae&apos;s Turnip price in your town on&nbsp;
          {renderDate()}
        </Col>
        <Col sm="12" md="6">
          <Input
            type="number"
            name="sundayPrice"
            id="sundayPrice"
            value={value === 0 ? '' : value}
            placeholder="--"
            onChange={(e) => onChange('price', parseInt(e.currentTarget.value, 10))}
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 6 }}>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={(e) => onChange('firstTime', e.currentTarget.checked)}
                checked={isFirstTime}
              />
            &nbsp;First time buying
            </Label>
          </FormGroup>
        </Col>
      </Row>
    </Container>
  );
};

SundayPriceForm.propTypes = propTypes;
SundayPriceForm.defaultProps = defaultProps;

export default SundayPriceForm;
