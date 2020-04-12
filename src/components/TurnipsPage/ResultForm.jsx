import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, Label, Input, Button, Collapse,
  Card, CardBody, Col,
} from 'reactstrap';
import { PATTERN } from '../../utils/predictions';

const propTypes = {
  onChange: PropTypes.func.isRequired,
  quantity: PropTypes.number,
  pattern: PropTypes.string,
  sellPrice: PropTypes.number,
  sundayPrice: PropTypes.number,
};

const defaultProps = {
  quantity: 0,
  pattern: null,
  sellPrice: null,
  sundayPrice: null,
};

const ResultForm = ({
  quantity,
  pattern,
  sellPrice,
  onChange,
  sundayPrice,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const calcResult = () => {
      const lost = sundayPrice * quantity;
      const won = sellPrice * quantity;
      setResult(won - lost);
    };
    calcResult();
  }, [quantity, sellPrice, sundayPrice]);

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (field) => (e) => onChange({ field, value: e.currentTarget.value });

  const renderForm = () => (
    <Card>
      <CardBody>
        <FormGroup row>
          <Label for="qty" sm="5">Quantity bought</Label>
          <Col sm={7}>
            <Input
              type="number"
              name="qty"
              id="qty"
              placeholder=""
              onChange={handleChange('quantity')}
              value={quantity}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="sellPrice" sm="5">Sell price</Label>
          <Col sm={7}>
            <Input
              type="number"
              name="sellPrice"
              id="sellPrice"
              placeholder=""
              value={sellPrice}
              onChange={handleChange('sellPrice')}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="pattern" sm="5">This week identified pattern</Label>
          <Col sm={7}>
            <Input
              type="select"
              name="pattern"
              id="pattern"
              value={pattern || -1}
              onChange={handleChange('pattern')}
            >
              <option value="-1">unknown</option>
              {Object.keys(PATTERN).map((key) => (
                <option key={key} value={key}>{key.replace('_', ' ').toLowerCase()}</option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        {(result > 0) && (
          <FormGroup row>
            <Label for="result" sm={5}>Total for the week</Label>
            <Col sm={7}>
              <Input
                className={result > 0 ? 'text-success' : 'text-danger'}
                type="string"
                name="result"
                id="result"
                disabled
                value={result}
              />
            </Col>
          </FormGroup>
        )}
      </CardBody>
    </Card>
  );

  return (
    <>
      <Button color="link" onClick={toggle} style={{ marginBottom: '1rem' }}>
        {isOpen ? 'Hide results' : 'Show results'}
      </Button>
      <Collapse isOpen={isOpen}>{renderForm()}</Collapse>
    </>
  );
};

ResultForm.propTypes = propTypes;
ResultForm.defaultProps = defaultProps;

export default ResultForm;
