import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { LABELS } from './';

const AddPriceForm = ({ onSave }) => {
  const [price, setPrice] = useState(0);
  const [when, setWhen] = useState(LABELS[0]);

  const onSavePrice = () => {
    onSave({ when, price: parseInt(price) });
  }

  const onChange = (value, field) => {
    switch (field) {
      case 'price':
        setPrice(value);
        break;
      case 'when':
        setWhen(value);
        break;
      default: break;
    }
  }

  return (
    <Form inline onSubmit={(e) => { e.preventDefault(); onSavePrice(); }}>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="when" className="mr-sm-2">When</Label>
        <Input
          type="select"
          name="when"
          id="when"
          value={when}
          onChange={(e) => onChange(e.currentTarget.value, 'when')}
        >
          {LABELS.map(v => <option key={v}>{v}</option>)}
        </Input>
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="price" className="mr-sm-2">Price</Label>
        <Input
          type="number"
          name="price"
          id="price"
          value={price}
          onChange={(e) => onChange(e.currentTarget.value, 'price')}
        />
      </FormGroup>
      <Button color="primary" onClick={onSavePrice}>Submit</Button>
    </Form>
  )
}

export default AddPriceForm;