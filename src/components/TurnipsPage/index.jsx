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

  useEffect(() => {
    // get the week
    const queryObj = qs.parse(location.search.slice(1));
    setCurrentWeek(DateUtils.getSundayDateForWeek(queryObj.date || dayjs().format('YYYY-MM-DD')));

    const weekValues = turnips[currentWeek];
    if (weekValues) {
      setSundayPrice(weekValues.sundayPrice || 0);
      setMyTownData(weekValues.graph || []);
      setIsFirstTime(weekValues.isFirstTime || false);
    } else {
      setSundayPrice(0);
      setMyTownData([]);
      setIsFirstTime(false);
    }
  }, [currentWeek, location.search, turnips]);

  const updateLocalStorage = (newPrice, newValues, firstTime) => {
    const obj = {
      [currentWeek]: {
        sundayPrice: newPrice,
        graph: [...newValues],
        isFirstTime: firstTime,
      },
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
      updateLocalStorage(value, myTownData, isFirstTime);
    } else if (field === 'firstTime') {
      setIsFirstTime(value);
      updateLocalStorage(sundayPrice, myTownData, value);
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
    updateLocalStorage(sundayPrice, newData, isFirstTime);
  };

  const changeWeek = (next) => {
    const newDate = next
      ? dayjs(currentWeek).add(1, 'week').format('YYYY-MM-DD')
      : dayjs(currentWeek).subtract(1, 'week').format('YYYY-MM-DD');
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
    updateLocalStorage(sundayPrice, [], isFirstTime);
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
        />
      </Wrapper>
    </>
  );
};

export default TurnipsPage;
