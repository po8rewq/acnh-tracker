import React, { useState, useEffect } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';
import { getMonth, capitalize } from '../utils';
import ProgressBar from './ProgressBar';
import Search from './Search';
import MonthTag from './MonthTag';
import HemisphereButton from './HemisphereButton';
import SectionContainer from './SectionContainer';

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
  renderTableBody: PropTypes.func.isRequired,
  renderTableHeader: PropTypes.func.isRequired,
  dataJson: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  localStorageName: PropTypes.string.isRequired,
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  setHemisphere: PropTypes.func.isRequired,
  availabilities: PropTypes.bool,
};

const defaultProps = {
  availabilities: true,
};

const ProgressTable = ({
  renderTableBody, renderTableHeader, dataJson, localStorageName, hemisphere, setHemisphere, availabilities,
}) => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(dataJson);
  const [creatures, setCreatures] = useLocalStorage(localStorageName, []);
  const [rSelected, setRSelected] = useState(1);

  useEffect(() => {
    const baseList = rSelected === 2 ? dataJson.filter((v) => {
      const currentMonth = dayjs().format('MMM').toLowerCase();
      return v[currentMonth] === 1;
    }) : [...dataJson];
    const s = search.trimLeft().trimRight();
    const newValue = s === '' ? baseList : baseList.filter((v) => v.name.toLowerCase().indexOf(s) !== -1);
    setList(newValue);
  }, [search, rSelected, dataJson]);

  const renderMonth = (f, month) => {
    const index = getMonth(month, hemisphere);
    return <MonthTag available={f[index] === 1} value={capitalize(month)} />;
  };

  const renderAvailabilities = (item) => (
    <>
      <td>{renderMonth(item, 'jan')}</td>
      <td>{renderMonth(item, 'feb')}</td>
      <td>{renderMonth(item, 'mar')}</td>
      <td>{renderMonth(item, 'apr')}</td>
      <td>{renderMonth(item, 'may')}</td>
      <td>{renderMonth(item, 'jun')}</td>
      <td>{renderMonth(item, 'jul')}</td>
      <td>{renderMonth(item, 'aug')}</td>
      <td>{renderMonth(item, 'sep')}</td>
      <td>{renderMonth(item, 'oct')}</td>
      <td>{renderMonth(item, 'nov')}</td>
      <td>{renderMonth(item, 'dec')}</td>
    </>
  );

  const toggleCreature = (id) => {
    const index = creatures.indexOf(id);
    if (index === -1) {
      setCreatures([...creatures, id]);
    } else {
      const newArray = [...creatures];
      newArray.splice(index, 1);
      setCreatures(newArray);
    }
  };

  const onSearchChange = (value) => setSearch(value);

  const renderBody = () => list.map((item) => (
    <BodyRow
      key={item.id}
      onClick={() => toggleCreature(item.id)}
      checked={creatures.indexOf(item.id) !== -1}
    >
      {renderTableBody(item)}
      {availabilities && renderAvailabilities(item)}
    </BodyRow>
  ));

  const renderHeader = () => (
    <tr>
      {renderTableHeader()}
      {availabilities && (
        <th colSpan="12" style={{ textAlign: 'center' }}>Availability</th>
      )}
    </tr>
  );

  return (
    <SectionContainer>
      {availabilities && (
        <Ctr>
          <HemisphereButton hemisphere={hemisphere} callback={setHemisphere} />
        </Ctr>
      )}
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
        <ProgressBar current={creatures.length} total={dataJson.length} />
      </Ctr>
      <Table size="sm" hover borderless responsive>
        <thead>{renderHeader()}</thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </SectionContainer>
  );
};

ProgressTable.propTypes = propTypes;
ProgressTable.defaultProps = defaultProps;

export default ProgressTable;
