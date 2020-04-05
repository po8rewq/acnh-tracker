import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { generate_possibilities } from '../../utils/predictions';

const Line = styled.tr`
  cursor: pointer;
`;

const Predictions = ({ buyPrice, sellPrices, displayEstimate }) => {
  if (!buyPrice) return null; // we don't render this component if we don't have the sell price

  const onClick = (min, max) => {
    displayEstimate(min, max);
  }

  const renderPatterns = () => {
    var sell_prices = [buyPrice, buyPrice, ...sellPrices];

    const isEmpty = sell_prices.every(sell_price => !sell_price);
    if (isEmpty) return null

    // Generator object
    let result = [];
    for (let poss of generate_possibilities(sell_prices)) {
      // console.log(poss)
      // TODO: optimise
      const days = [...poss.prices].slice(2);
      const mins = days.map(d => d.min);
      const maxs = days.map(d => d.max);

      result.push(
        <Line onClick={() => onClick(mins, maxs)}>
          <td>{poss.pattern_description}</td>
          {days.map(day => {
            if (day.min !== day.max) return <td>{day.min}..{day.max}</td>;
            return <td>{day.min}</td>;
          })}
        </Line>
      )
    }
    return result;
  }

  return (
    <>
      <h3>Predictions</h3>
      <Table size="sm" hover borderless responsive>
        <thead>
          <tr>
            <th>Pattern</th>
            <th colSpan="2">Monday</th>
            <th colSpan="2">Tuesday</th>
            <th colSpan="2">Wednesday</th>
            <th colSpan="2">Thursday</th>
            <th colSpan="2">Friday</th>
            <th colSpan="2">Saturday</th>
          </tr>
        </thead>
        <tbody>{renderPatterns()}</tbody>
      </Table>
    </>
  )
}

export default Predictions;