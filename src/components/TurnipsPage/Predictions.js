import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { generate_possibilities } from '../../utils/predictions';

const Line = styled.tr`
  cursor: pointer;
`;

const Predictions = ({ buyPrice, sellPrices, displayEstimate }) => {
  const onClick = (min, max) => {
    displayEstimate(min, max);
  }

  const renderPatterns = () => {
    const p = buyPrice === 0 ? NaN : buyPrice;
    const sell_prices = [p, p, ...sellPrices];

    const isEmpty = sell_prices.every(sell_price => !sell_price);
    if (isEmpty) return null

    const possibilities = Array.from(generate_possibilities(sell_prices));
    return possibilities.map(poss => {
      // for the additional graphs
      const days = poss.prices.slice(buyPrice === 0 ? 1 : 2);
      const { mins, maxs } = days.reduce((acc, d) => ({
        mins: [...acc.mins, d.min],
        maxs: [...acc.maxs, d.max],
      }), { mins: [], maxs: [] })

      const des = poss.pattern_description.split(',')
      return (
        <Line onClick={() => onClick(mins, maxs)}>
          <td><ul>{des.map(d => <li>{d}</li>)}</ul></td>
          {days.map(day => {
            if (day.min !== day.max) return <td>{day.min}..{day.max}</td>;
            return <td>{day.min}</td>;
          })}
        </Line>
      )
    });
  }

  return (
    <>
      <h3>Predictions</h3>
      <Table size="sm" hover responsive>
        <thead>
          <tr>
            <th>Pattern</th>
            {buyPrice === 0 && (
              <th>Sunday</th>
            )}
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