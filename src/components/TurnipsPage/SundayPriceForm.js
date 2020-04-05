import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import dayjs from 'dayjs';

const SundayPriceForm = ({ onSave, currentWeek, value }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(value);
  }, [value])

  const onSaveSundayPrice = () => {
    onSave(parseInt(price));
  }

  return (
    <Form inline onSubmit={(e) => { e.preventDefault(); onSaveSundayPrice() }}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="sundayPrice" className="mr-sm-2">
          Daisy Mae's Turnip price in your town on&nbsp;<strong>Sunday {dayjs(currentWeek).format('DD MMMM YYYY')}</strong>
        </Label>
        <Input
          type="number"
          name="sundayPrice"
          id="sundayPrice"
          value={price}
          onChange={(e) => setPrice(e.currentTarget.value)}
        />
      </FormGroup>
      <Button color="primary" onClick={onSaveSundayPrice}>Save</Button>
    </Form>
  );
}

export default SundayPriceForm;