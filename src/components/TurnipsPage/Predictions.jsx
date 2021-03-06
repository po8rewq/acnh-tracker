import React, { useMemo } from 'react';
import { Table, ListGroupItem, ListGroup } from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Predictor, { PATTERN } from '../../utils/predictions'; // eslint-disable-line

const PATTERN_DESCRIPTION = [
  'Fluctuating',
  'Large spike',
  'Decreasing',
  'Small spike',
  'All patterns',
];

const Line = styled.tr`
  cursor: pointer;

  ${(p) => p.selected && `
  background-color: #f0e8c0;
  `}

  td {
    text-align: center;
  }

  span.lowest-price {
    color: #ffc107;
    font-weight: bold;
  }

  span.highest-price {
    color: #28a745;
    font-weight: bold;
  }

`;

const propTypes = {
  buyPrice: PropTypes.number.isRequired,
  sellPrices: PropTypes.arrayOf(PropTypes.number).isRequired,
  displayEstimate: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool,
  selectedLines: PropTypes.arrayOf(PropTypes.object),
  lastWeekPattern: PropTypes.number,
};

const defaultProps = {
  selectedLines: [],
  isFirstTime: false,
  lastWeekPattern: -1,
};

const Predictions = ({
  buyPrice, sellPrices, displayEstimate, isFirstTime, selectedLines, lastWeekPattern,
}) => {
  const onClick = (key, min, max) => {
    displayEstimate(key, min, max);
  };

  const renderDays = (days) => {
    // not used yet
    const { min, max } = days.reduce((acc, val) => {
      const newObj = { ...acc };
      if (!acc.max || val.max > acc.max) newObj.max = val.max;
      if (!acc.min || val.min < acc.min) newObj.min = val.min;
      return newObj;
    }, { min: null, max: null });

    const renderValue = (value) => {
      let className = '';
      if (value === min) className = 'lowest-price';
      else if (value === max) className = 'highest-price';
      return <span className={className}>{value}</span>;
    };

    return days.map((day) => (
      <td key={shortid.generate()}>
        {day.min !== day.max ? (
          <>
            {renderValue(day.min)}
            &nbsp;to&nbsp;
            {renderValue(day.max)}
          </>
        ) : renderValue(day.min)}
      </td>
    ));
  };

  const renderPercentage = (percent) => (Number.isFinite(percent) ? (`${(percent * 100).toPrecision(3)}%`) : '—');

  const renderPatterns = (possibilities) => {
    if (!possibilities) return [];
    return possibilities.map((poss) => {
      // for the additional graphs - we don't need the sunday price
      const { mins, maxs } = poss.prices.slice(2).reduce((acc, d) => ({
        mins: [...acc.mins, d.min],
        maxs: [...acc.maxs, d.max],
      }), { mins: [], maxs: [] });

      const days = poss.prices.slice(1);
      const key = JSON.stringify(poss.prices);
      const isSelected = selectedLines.findIndex((v) => v.key === key) !== -1;

      return (
        <Line
          onClick={() => onClick(key, mins, maxs)}
          key={shortid.generate()}
          selected={isSelected}
        >
          <td>{PATTERN_DESCRIPTION[poss.pattern_number]}</td>
          <td>{renderPercentage(poss.probability)}</td>
          {renderDays(days)}
          <td>{poss.weekGuaranteedMinimum}</td>
          <td>{poss.weekMax}</td>
        </Line>
      );
    });
  }

  const renderPatternProbabilities = (possibilities) => {
    if (!possibilities) return [];
    let previousPattern = '';
    return possibilities.reduce((acc, poss) => {
      if (previousPattern !== poss.pattern_number) {
        previousPattern = poss.pattern_number;
        if (!poss.category_total_probability) return [...acc];
        const newValue = (
          <ListGroupItem key={poss.pattern_number}>{`${PATTERN_DESCRIPTION[poss.pattern_number]}: ${renderPercentage(poss.category_total_probability)}`}</ListGroupItem>
        );
        return [...acc, newValue];
      }
      return [...acc];
    }, []);
  };

  const possibilities = useMemo(() => {
    const p = buyPrice === 0 ? NaN : buyPrice;
    const prices = [p, p, ...sellPrices];
  
    const isEmpty = prices.every((s) => !s);
    if (isEmpty) return null;
  
    const predictor = new Predictor(
      prices,
      isFirstTime,
      (PATTERN[lastWeekPattern] || -1),
    );
    return predictor.analyze_possibilities();
  }, [buyPrice, sellPrices, isFirstTime, lastWeekPattern]);

  return (
    <>
      <h3>Predictions</h3>

      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <ListGroup horizontal="lg">
          {renderPatternProbabilities(possibilities)}
        </ListGroup>
      </div>

      <Table size="sm" hover responsive>
        <thead>
          <tr>
            <th>Pattern</th>
            <th>%</th>
            <th>Sunday</th>
            <th colSpan="2">Monday</th>
            <th colSpan="2">Tuesday</th>
            <th colSpan="2">Wednesday</th>
            <th colSpan="2">Thursday</th>
            <th colSpan="2">Friday</th>
            <th colSpan="2">Saturday</th>
            <th>Guaranteed Min</th>
            <th>Potential Max</th>
          </tr>
        </thead>
        <tbody>{renderPatterns(possibilities)}</tbody>
      </Table>
    </>
  );
};

Predictions.propTypes = propTypes;
Predictions.defaultProps = defaultProps;

export default Predictions;
