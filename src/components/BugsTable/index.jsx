import React from 'react';
import PropTypes from 'prop-types';
import BugIcons from './BugIcons';
import ProgressTable from '../ProgressTable';
import bugsJson from '../../data/bugs.json';
import { formatNameToImage } from '../../utils';

const propTypes = {
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  setHemisphere: PropTypes.func.isRequired,
};

const BugsTable = ({ hemisphere, setHemisphere }) => {
  const body = (bug) => (
    <>
      <td><BugIcons icon={formatNameToImage(bug.name)} /></td>
      <td>{bug.name}</td>
      <td>{bug.location}</td>
      <td>{bug.price}</td>
      <td>{bug.time}</td>
    </>
  );

  const header = () => (
    <>
      <th>&nbsp;</th>
      <th>Name</th>
      <th>Location</th>
      <th>Price</th>
      <th>Shadow</th>
      <th>Time</th>
    </>
  );

  return (
    <ProgressTable
      renderTableBody={body}
      renderTableHeader={header}
      dataJson={bugsJson}
      localStorageName="bugs"
      hemisphere={hemisphere}
      setHemisphere={setHemisphere}
    />
  );
};

BugsTable.propTypes = propTypes;

export default BugsTable;
