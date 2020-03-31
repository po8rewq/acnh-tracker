import React from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import BugIcons from './BugIcons';
import bugsJson from '../data/bugs.json';
import useLocalStorage from '../hooks/useLocalStorage';
import { getMonth } from '../utils';

const BodyRow = styled.tr`
  td {
    vertical-align: middle;
  }

  input {
    /* Double-sized Checkboxes */
    -ms-transform: scale(2); /* IE */
    -moz-transform: scale(2); /* FF */
    -webkit-transform: scale(2); /* Safari and Chrome */
    -o-transform: scale(2); /* Opera */
    padding: 10px;
    margin: 2px;
    cursor: pointer;
  }
`;

const BugsTable = ({ hemisphere }) => {
  const [bugs, setBugs] = useLocalStorage('bugs', []);

  const renderMonth = (f, month) => {
    const index = getMonth(month, hemisphere)
    return <FontAwesomeIcon icon={f[index] === 1 ? faCheck : faMinus} />;
  }

  const toggleFish = (id) => {
    const index = bugs.indexOf(id);
    if (index === -1) {
      setBugs([...bugs, id]);
    } else {
      const newArray = [...bugs];
      newArray.splice(index, 1);
      setBugs(newArray);
    }
  }

  const renderBody = () => bugsJson.map(f => {
    return (
      <BodyRow key={f.id}>
        <td><input type="checkbox" onChange={() => toggleFish(f.id)} checked={bugs.indexOf(f.id) !== -1} /></td>
        <td><BugIcons icon={f.name.replace(/[" "]/g, '').replace('-', '').replace('\'', '').toLowerCase()} />{f.name}</td>
        <td>{f.location}</td>
        <td>{f.price}</td>
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
    <Table size="sm" hover borderless responsive>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Location</th>
          <th>Price</th>
          <th>Time</th>
          <th>Jan</th>
          <th>Feb</th>
          <th>Mar</th>
          <th>Apr</th>
          <th>May</th>
          <th>Jun</th>
          <th>Jul</th>
          <th>Aug</th>
          <th>Sep</th>
          <th>Oct</th>
          <th>Nov</th>
          <th>Dec</th>
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  )
}

export default BugsTable;
