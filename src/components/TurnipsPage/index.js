import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ChartistGraph from 'react-chartist';
import styled from 'styled-components';
import dayjs from 'dayjs';
import qs from 'qs';
import { Alert, ButtonGroup, Button } from 'reactstrap';
import useLocalStorage from '../../hooks/useLocalStorage';
import * as DateUtils from '../../utils/dates';
import AddPriceForm from './AddPriceForm';
import SundayPriceForm from './SundayPriceForm';
import Predictions from './Predictions';

import Tooltip from 'chartist-plugin-tooltips'; // needed for chartist
import Chartist from 'chartist';

import 'chartist/dist/chartist.min.css';
import 'chartist-plugin-tooltips/dist/chartist-plugin-tooltip.css';

const Wrapper = styled.div`
  margin: 20px;
  `;

const ChartContainer = styled.div`
  .ct-series-a .ct-line, .ct-series-b .ct-line {
    opacity: .5;
  }
`;

export const LABELS = ['Mon AM', 'Mon PM', 'Tue AM', 'Tue PM', 'Wed AM', 'Wed PM', 'Thu AM', 'Thu PM', 'Fri AM', 'Fri PM', 'Sat AM', 'Sat PM'];

const TurnipsPage = () => {
  const history = useHistory();
  const location = useLocation();
  /** indexed by the date of the sunday for the week ahead
   * { '05-04-2020': {
   *    'sundayPrice': 123,
   *    'graph': [
   *        {when: 'mon_am', value: 90}, 
   *        {when: 'fri_pm', value: 9}
   *    ]
   *  } }
   */
  const [turnips, setTurnips] = useLocalStorage('turnips', {})

  const [currentWeek, setCurrentWeek] = useState(null);
  const [sundayPrice, setSundayPrice] = useState(0);
  const [myTownData, setMyTownData] = useState([]);
  const [predictions, setPredictions] = useState({ min: null, max: null })

  useEffect(() => {
    // get the week
    const queryObj = qs.parse(location.search.slice(1));
    setCurrentWeek(DateUtils.getSundayDateForWeek(queryObj.date || dayjs().format('YYYY-MM-DD')));

    // get current graph - currentPrice - from local storage
    const weekValues = turnips[currentWeek];
    if (weekValues) {
      setSundayPrice(weekValues.sundayPrice || 0);
      setMyTownData(weekValues.graph || []);
    } else {
      setSundayPrice(0);
      setMyTownData([]);
    }
  }, [currentWeek, location.search, turnips]) // TODO: shouldn't change if turnips changes

  const updateLocalStorage = (newPrice, newValues) => {
    const obj = {
      [currentWeek]: {
        sundayPrice: newPrice,
        graph: [...newValues]
      }
    };
    const newObj = { ...turnips, ...obj };
    setTurnips(newObj);
  }

  const formateLabelName = (l) => l.trim().replace(' ', '_').toLowerCase()

  const getFormatedData = (defaultValue = null) => LABELS.map(l => {
    const value = myTownData.find(d => d.when === formateLabelName(l))
    if (value) return value.price || defaultValue;
    return defaultValue;
  })

  const simpleLineChartData = {
    labels: LABELS,
    series: [
      [...(predictions.min ? predictions.min : [])],
      [...(predictions.max ? predictions.max : [])],
      getFormatedData(),
    ]
  }

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 50
    },
    high: 800,
    low: 0,
    height: '400px',
    plugins: [
      Chartist.plugins.tooltip({
        anchorToPoint: true,
        appendToBody: true,
      })
    ]
  };

  const onSaveSundayPrice = (value) => {
    setSundayPrice(value);
    updateLocalStorage(value, myTownData);
  }

  const addNewPrice = ({ when, price }) => {
    const formatedWhen = formateLabelName(when);
    const index = myTownData.findIndex(v => v.when === formatedWhen);
    const newValue = {
      when: formatedWhen,
      price: price === 0 ? null : price,
      order: LABELS.indexOf(when)
    };

    let newData = [...myTownData]
    if (index === -1) {
      newData.push(newValue)
    } else {
      newData.splice(index, 1, newValue)
    }

    setMyTownData(newData);
    updateLocalStorage(sundayPrice, newData);
  }

  const changeWeek = (next) => {
    const newDate = next ?
      dayjs(currentWeek).add(1, 'week').format('YYYY-MM-DD') :
      dayjs(currentWeek).subtract(1, 'week').format('YYYY-MM-DD');
    history.push(`${location.pathname}?date=${newDate}`)
  }

  const displayEstimate = (min, max) => {
    setPredictions({ min, max });
  }

  return (
    <>
      <Wrapper>
        <Alert color="warning">
          <strong>Notes</strong>
          <ul>
            <li>if you want to update a value, just set it again, it will override the previous one</li>
            <li>if you want to remove a value, set the price to <strong>0</strong></li>
            <li>You need to set the price from Daisy Mae to see the predictions</li>
            <li>The predictions will be filtered by the values you add during the week</li>
            <li>Click on the prediction line to see the graph (you can only see 1 at a time)</li>
          </ul>
        </Alert>
      </Wrapper>
      <Wrapper>
        <h3>My town prices</h3>
        <ButtonGroup>
          <Button onClick={() => changeWeek(false)}>Previous week</Button>
          <Button onClick={() => changeWeek(true)}>Next week</Button>
        </ButtonGroup>
      </Wrapper>
      <Wrapper>
        <SundayPriceForm onSave={onSaveSundayPrice} currentWeek={currentWeek} value={sundayPrice} />
      </Wrapper>
      <ChartContainer>
        <ChartistGraph data={simpleLineChartData} type={'Line'} options={options} />
      </ChartContainer>
      <Wrapper>
        <AddPriceForm onSave={addNewPrice} />
      </Wrapper>
      <Wrapper>
        <Predictions buyPrice={sundayPrice} sellPrices={getFormatedData(NaN)} displayEstimate={displayEstimate} />
      </Wrapper>
    </>
  );
}

export default TurnipsPage;