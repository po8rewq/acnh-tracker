import React from 'react';
import PropTypes from 'prop-types';
import FishIcons from './FishIcons';
import fishJson from '../../data/fish.json';
import { formatNameToImage } from '../../utils';
import ProgressTable from '../ProgressTable';

const propTypes = {
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  setHemisphere: PropTypes.func.isRequired,
};

const FishTable = ({ hemisphere, setHemisphere }) => {
  const body = (f) => (
    <>
      <td><FishIcons icon={formatNameToImage(f.name)} /></td>
      <td>{f.name}</td>
      <td>{f.location}</td>
      <td>{f.price}</td>
      <td>{f.shadow}</td>
      <td>{f.time}</td>
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
      dataJson={fishJson}
      localStorageName="fish"
      hemisphere={hemisphere}
      setHemisphere={setHemisphere}
    />
  );
};

FishTable.propTypes = propTypes;

export default FishTable;
