import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import FishIcons from './FishIcons';
import fishJson from '../data/fish.json';
import useLocalStorage from '../hooks/useLocalStorage';
import { getMonth, capitalize } from '../utils';
import ProgressBar from './ProgressBar';
import Search from './Search';
import Checkbox from './Checkbox';
import MonthTag from './MonthTag';

const BodyRow = styled.tr`
  td {
    vertical-align: middle;
  }
`;

const FishTable = ({ hemisphere }) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(fishJson);
  const [fish, setFish] = useLocalStorage('fish', []);

  useEffect(() => {
    const s = search.trimLeft().trimRight();
    const newValue = s === '' ? [...fishJson] : fishJson.filter(v => v.name.toLowerCase().indexOf(s) !== -1);
    setList(newValue);
  }, [search])

  const renderMonth = (f, month) => {
    const index = getMonth(month, hemisphere);
    return <MonthTag available={f[index] === 1} value={capitalize(month)} />;
  }

  const toggleFish = (id) => {
    const index = fish.indexOf(id);
    if (index === -1) {
      setFish([...fish, id]);
    } else {
      const newArray = [...fish];
      newArray.splice(index, 1);
      setFish(newArray);
    }
  }

  const onSearchChange = (value) => setSearch(value);

  const renderBody = () => list.map(f => {
    return (
      <BodyRow key={f.id}>
        <td><Checkbox onChange={() => toggleFish(f.id)} checked={fish.indexOf(f.id) !== -1} /></td>
        <td><FishIcons icon={f.name.replace(/[" "]/g, '').replace('-', '').toLowerCase()} />{f.name}</td>
        <td>{f.location}</td>
        <td>{f.price}</td>
        <td>{f.shadow}</td>
        <td>{f.time}</td>
        <td>{renderMonth(f, 'jan')}</td>
        <td>{renderMonth(f, 'feb')}</td>
        <td>{renderMonth(f, 'mar')}</td>
        <td>{renderMonth(f, 'apr')}</td>
        <td>{renderMonth(f, 'may')}</td>
        <td>{renderMonth(f, 'jun')}</td>
        <td>{renderMonth(f, 'jul')}</td>
        <td>{renderMonth(f, 'aug')}</td>
        <td>{renderMonth(f, 'sep')}</td>
        <td>{renderMonth(f, 'oct')}</td>
        <td>{renderMonth(f, 'nov')}</td>
        <td>{renderMonth(f, 'dec')}</td>
      </BodyRow>
    )
  })
  return (
    <>
      <div style={{ marginBottom: '10px', width: '100%', display: 'flex' }}>
        <Search value={search} onChange={onSearchChange} />
      </div>
      <ProgressBar current={fish.length} total={fishJson.length} />
      <Table size="sm" hover borderless responsive>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Shadow</th>
            <th>Time</th>
            <th colspan="12" style={{ textAlign: "center" }}>Availability</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </>
  )
}

export default FishTable;
