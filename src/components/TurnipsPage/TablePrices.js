import React from 'react';
import { Table, Input } from 'reactstrap';

const TablePrices = ({ values, savePrice }) => {
  const onChange = ({ field, value }) => {
    savePrice({
      when: field,
      price: parseInt(value)
    })
  }

  const formateLabelName = (l) => l.trim().replace(' ', '_').toLowerCase()

  const renderInput = (name) => {
    const v = values.find(v => v.when === formateLabelName(name));
    let value = "";
    if (v) value = v.price === 0 ? "" : v.price;
    return <Input type="number" name="" id="" placeholder="" value={value} onChange={(e) => onChange({
      field: name,
      value: e.currentTarget.value
    })} />
  }

  return (
    <Table borderless>
      <thead>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>AM</td>
          <td>{renderInput('Mon AM')}</td>
          <td>{renderInput('tue AM')}</td>
          <td>{renderInput('Wed AM')}</td>
          <td>{renderInput('Thu AM')}</td>
          <td>{renderInput('Fri AM')}</td>
          <td>{renderInput('Sat AM')}</td>
        </tr>
        <tr>
          <td>PM</td>
          <td>{renderInput('Mon PM')}</td>
          <td>{renderInput('Tue PM')}</td>
          <td>{renderInput('Wed PM')}</td>
          <td>{renderInput('Thu PM')}</td>
          <td>{renderInput('Fri PM')}</td>
          <td>{renderInput('Sat PM')}</td>
        </tr>
      </tbody>
    </Table>
  )
}

export default TablePrices;