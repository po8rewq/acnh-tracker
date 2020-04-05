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

import 'chartist/dist/chartist.min.css';
import SundayPriceForm from './SundayPriceForm';

const Wrapper = styled.div`
  margin: 20px;
`;

export const LABELS = ['Mon AM', 'Mon PM', 'Tue AM', 'Tue PM', 'Wed AM', 'Wed PM', 'Thu AM', 'Thu PM', 'Fri AM', 'Fri PM', 'Sat AM', 'Sat PM'];

const TurnipsPage = () => {
  const history = useHistory();
  const location = useLocation();
  /** indexed by the date of the sunday for the week ahead
   * {
   * '05-04-2020': {
   *    'sundayPrice': 123,
   *    'graph': [
   *        {when: 'mon_am', value: 90}, 
   *        {when: 'fri_pm', value: 9}
   *    ]
   *  } 
   * }
   */
  const [turnips, setTurnips] = useLocalStorage('turnips', {})

  const [currentWeek, setCurrentWeek] = useState(null);
  const [sundayPrice, setSundayPrice] = useState(0);
  const [myTownData, setMyTownData] = useState([]);

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

  const simpleLineChartData = {
    labels: LABELS,
    series: [
      LABELS.map(l => {
        const value = myTownData.find(d => d.when === formateLabelName(l))
        if (value) return value.price;
        return null;
      })
      // [], // estimate - TODO: min and max
    ]
  }

  const options = {
    fullWidth: true,
    chartPadding: {
      right: 50
    },
    high: 500,
    low: 50,
    height: '300px',
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

  return (
    <>
      <Wrapper>
        <Alert color="warning">
          <strong>PLEASE READ</strong>
          <ul>
            <li>Turnip prices fluctuate in the morning and again in the afternoon, from anywhere between <strong>50</strong> and <strong>445</strong> Bells</li>
            <li>if you want to update a value, just set it again, it will override the previous one</li>
            <li>if you want to remove a value, set the price to <strong>0</strong></li>
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
      <ChartistGraph data={simpleLineChartData} type={'Line'} options={options} />
      <Wrapper>
        <AddPriceForm onSave={addNewPrice} />
      </Wrapper>
    </>
  );
}

export default TurnipsPage;