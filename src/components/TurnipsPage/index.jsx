import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import styled from 'styled-components';
import dayjs from 'dayjs';
import qs from 'qs';
import { ButtonGroup, Button } from 'reactstrap';
import Tooltip from 'chartist-plugin-tooltips'; // eslint-disable-line
import Chartist from 'chartist';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as DateUtils from '../../utils/dates';
import SundayPriceForm from './SundayPriceForm';
import Predictions from './Predictions';
import TablePrices from './TablePrices';
import ResultForm from './ResultForm';

import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';

const Wrapper = styled.div`
  margin: 20px;
  `;

const ChartContainer = styled.div`
  .ct-series, .ct-point {
    opacity: .3;
  }

  .ct-series:last-child .ct-point {
    opacity: 1;
    stroke: red;
  }

  .ct-series:last-child .ct-line {
    stroke: red;
    stroke-width: 5px;
    stroke-dasharray: 10px 20px;
  }

  .ct-series:last-child {
    opacity: 1;
    stroke: red;
  }
`;

export const LABELS = ['Mon AM', 'Mon PM', 'Tue AM', 'Tue PM', 'Wed AM', 'Wed PM', 'Thu AM', 'Thu PM', 'Fri AM', 'Fri PM', 'Sat AM', 'Sat PM'];

const TurnipsPage = () => {
  const history = useHistory();
  const location = useLocation();
  const [turnips, setTurnips] = useLocalStorage('turnips', {});

  const [currentWeek, setCurrentWeek] = useState(null);
  const [sundayPrice, setSundayPrice] = useState(0);
  const [myTownData, setMyTownData] = useState([]);
  const [isFirstTime, setIsFirstTime] = useState();
  const [selectedPredictions, setSelectedPredictions] = useState([]);

  const [quantityBought, setQuantityBought] = useState();
  const [pattern, setPattern] = useState();
  const [sellPrice, setSellPrice] = useState();

  // last week pattern for the %
  const [lastWeekPattern, setLastWeekPattern] = useState(null);

  useEffect(() => {
    // get the week
    const queryObj = qs.parse(location.search.slice(1));
    setCurrentWeek(DateUtils.getSundayDateForWeek(queryObj.date || dayjs().format('YYYY-MM-DD')));

    // check if we have data for the previous week and  if we have a pattern
    const lastWeek = turnips[DateUtils.getPreviousWeek(currentWeek)];
    if (lastWeek && lastWeek.pattern) {
      setLastWeekPattern(lastWeek.pattern);
    }

    const weekValues = turnips[currentWeek];
    if (weekValues) {
      setSundayPrice(weekValues.sundayPrice || 0);
      setMyTownData(weekValues.graph || []);
      setIsFirstTime(weekValues.isFirstTime || false);
      setQuantityBought(weekValues.qty || null);
      setPattern(weekValues.pattern || -1);
      setSellPrice(weekValues.sellPrice || null);
    } else {
      setSundayPrice(0);
      setMyTownData([]);
      setIsFirstTime(false);
      setQuantityBought(null);
      setPattern(-1);
      setSellPrice(null);
    }
  }, [currentWeek, location.search, turnips]);

  const updateLocalStorage = (newWeekValues) => {
    const oldValue = turnips[currentWeek];
    const obj = {
      [currentWeek]: { ...oldValue, ...newWeekValues },
    };
    const newObj = { ...turnips, ...obj };
    setTurnips(newObj);
  };

  const formateLabelName = (l) => l.trim().replace(' ', '_').toLowerCase();

  const getFormatedData = (defaultValue = null) => LABELS.map((l) => {
    const value = myTownData.find((d) => d.when === formateLabelName(l));
    if (value) return value.price || defaultValue;
    return defaultValue;
  });

  const getSelectedEstimates = () => selectedPredictions.reduce((acc, val) => {
    const newObj = [];
    if (val.min) newObj.push(val.min);
    if (val.max) newObj.push(val.max);
    return [...acc, ...newObj];
  }, []);

  const simpleLineChartData = {
    labels: LABELS,
    series: [
      ...getSelectedEstimates(),
      getFormatedData(),
    ],
  };

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 50,
    },
    scaleMinSpace: 20,
    height: '400px',
    onlyInteger: true,
    plugins: [
      Chartist.plugins.tooltip({
        anchorToPoint: true,
        appendToBody: true,
      }),
    ],
  };

  const onSaveSundayPrice = (field, value) => {
    if (field === 'price') {
      setSundayPrice(value);
      updateLocalStorage({ sundayPrice: value });
    } else if (field === 'firstTime') {
      setIsFirstTime(value);
      updateLocalStorage({ isFirstTime: value });
    }
  };

  const addNewPrice = ({ when, price }) => {
    const formatedWhen = formateLabelName(when);
    const index = myTownData.findIndex((v) => v.when === formatedWhen);
    const newValue = {
      when: formatedWhen,
      price: price === 0 ? null : price,
      order: LABELS.indexOf(when),
    };

    const newData = [...myTownData];
    if (index === -1) {
      newData.push(newValue);
    } else {
      newData.splice(index, 1, newValue);
    }

    setMyTownData(newData);
    updateLocalStorage({ graph: newData });
  };

  const changeWeek = (next) => {
    const newDate = next
      ? DateUtils.getNextWeek(currentWeek)
      : DateUtils.getPreviousWeek(currentWeek);
    history.push(`${location.pathname}?date=${newDate}`);
  };

  const displayEstimate = (key, min, max) => {
    const index = selectedPredictions.findIndex((v) => v.key === key);
    if (index === -1) {
      const newData = [...selectedPredictions, { key, min, max }];
      setSelectedPredictions(newData);
    } else {
      const newData = [...selectedPredictions];
      newData.splice(index, 1);
      setSelectedPredictions(newData);
    }
  };

  const resetPrices = () => {
    setMyTownData([]);
    updateLocalStorage({ graph: [] });
  };

  const onChangeResultForm = ({ field, value }) => {
    const intValue = parseInt(value, 10);
    switch (field) {
      case 'pattern':
        setPattern(value);
        updateLocalStorage({ pattern: value });
        break;
      case 'quantity':
        setQuantityBought(intValue);
        updateLocalStorage({ qty: intValue });
        break;
      case 'sellPrice':
        setSellPrice(intValue);
        updateLocalStorage({ sellPrice: intValue });
        break;
      default: break;
    }
  };

  return (
    <>
      <Wrapper style={{ display: 'flex', flexDirection: 'row' }}>
        <h3>My town prices</h3>
        <ButtonGroup style={{ marginLeft: '20px' }}>
          <Button onClick={() => changeWeek(false)} size="sm" color="link">
            {'<'}
            {' '}
            Previous week
          </Button>
          <Button onClick={() => changeWeek(true)} size="sm" color="link">
            Next week
            {' '}
            {'>'}
          </Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <SundayPriceForm
          onChange={onSaveSundayPrice}
          currentWeek={currentWeek}
          value={sundayPrice}
          isFirstTime={isFirstTime}
        />
      </Wrapper>
      <Wrapper>
        <ResultForm
          onChange={onChangeResultForm}
          quantity={quantityBought}
          pattern={pattern}
          sellPrice={sellPrice}
          sundayPrice={sundayPrice}
        />
      </Wrapper>
      <Wrapper>
        <TablePrices values={myTownData} savePrice={addNewPrice} reset={resetPrices} />
      </Wrapper>
      <ChartContainer>
        <ChartistGraph data={simpleLineChartData} type="Line" options={options} />
      </ChartContainer>
      <Wrapper>
        <Predictions
          buyPrice={sundayPrice}
          sellPrices={getFormatedData(NaN)}
          displayEstimate={displayEstimate}
          isFirstTime={isFirstTime}
          selectedLines={selectedPredictions}
          lastWeekPattern={lastWeekPattern}
        />
      </Wrapper>
    </>
  );
};

export default TurnipsPage;
