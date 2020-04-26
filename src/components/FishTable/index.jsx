import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import FishIcons from './FishIcons';
import fishJson from '../../data/fish.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getMonth, capitalize, formatNameToImage } from '../../utils';
import ProgressBar from '../ProgressBar';
import Search from '../Search';
import MonthTag from '../MonthTag';
import HemisphereButton from '../HemisphereButton';
import SectionContainer from '../SectionContainer';

const BodyRow = styled.tr`
  cursor: pointer;

  ${(p) => p.checked && `
  background-color: #f0e8c0;
  `}

  td {
    vertical-align: middle;
  }
`;

const Ctr = styled.div`
  margin: 15px 0;
`;

const propTypes = {
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  setHemisphere: PropTypes.func.isRequired,
};

const FishTable = ({ hemisphere, setHemisphere }) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(fishJson);
  const [fish, setFish] = useLocalStorage('fish', []);
  const [rSelected, setRSelected] = useState(1);

  useEffect(() => {
    const baseList = rSelected === 2 ? fishJson.filter((v) => {
      const currentMonth = dayjs().format('MMM').toLowerCase();
      return v[currentMonth] === 1;
    }) : [...fishJson];
    const s = search.trimLeft().trimRight();
    const newValue = s === '' ? baseList : baseList.filter((v) => v.name.toLowerCase().indexOf(s) !== -1);
    setList(newValue);
  }, [search, rSelected]);

  const renderMonth = (f, month) => {
    const index = getMonth(month, hemisphere);
    return <MonthTag available={f[index] === 1} value={capitalize(month)} />;
  };

  const toggleFish = (id) => {
    const index = fish.indexOf(id);
    if (index === -1) {
      setFish([...fish, id]);
    } else {
      const newArray = [...fish];
      newArray.splice(index, 1);
      setFish(newArray);
    }
  };

  const onSearchChange = (value) => setSearch(value);

  const renderBody = () => list.map((f) => (
    <BodyRow key={f.id} onClick={() => toggleFish(f.id)} checked={fish.indexOf(f.id) !== -1}>
      <td><FishIcons icon={formatNameToImage(f.name)} /></td>
      <td>{f.name}</td>
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
  ));
  return (
    <SectionContainer>
      <Ctr>
        <HemisphereButton hemisphere={hemisphere} callback={setHemisphere} />
      </Ctr>
      <Ctr>
        <Search value={search} onChange={onSearchChange} />
      </Ctr>
      <Ctr>
        <ButtonGroup>
          <Button color={rSelected === 1 ? 'primary' : 'link'} onClick={() => setRSelected(1)} disabled={rSelected === 1}>See all</Button>
          <Button color={rSelected === 2 ? 'primary' : 'link'} onClick={() => setRSelected(2)} disabled={rSelected === 2}>Only those I can catch</Button>
        </ButtonGroup>
      </Ctr>
      <Ctr>
        <ProgressBar current={fish.length} total={fishJson.length} />
      </Ctr>
      <Table size="sm" hover borderless responsive>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Shadow</th>
            <th>Time</th>
            <th colSpan="12" style={{ textAlign: 'center' }}>Availability</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </SectionContainer>
  );
};

FishTable.propTypes = propTypes;

export default FishTable;
