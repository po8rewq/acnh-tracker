import React from 'react';
import PropTypes from 'prop-types';

import ProgressTable from '../ProgressTable';
import SeaCreatureIcons from './SeaCreatureIcons';
import creaturesJson from '../../data/sea_creatures.json';
import { formatNameToImage } from '../../utils';

const propTypes = {
  hemisphere: PropTypes.oneOf(['northern', 'southern']).isRequired,
  setHemisphere: PropTypes.func.isRequired,
};

const SeaCreaturesTable = ({ hemisphere, setHemisphere }) => {
  const header = () => (
    <>
      <th>&nbsp;</th>
      <th>Name</th>
      <th>Price</th>
      <th>Shadow</th>
      <th>Time</th>
    </>
  );

  const body = (item) => (
    <>
      <td><SeaCreatureIcons icon={formatNameToImage(item.name)} /></td>
      <td>{item.name}</td>
      <td>{item.price}</td>
      <td />
      <td>{item.time}</td>
    </>
  );

  return (
    <ProgressTable
      renderTableHeader={header}
      renderTableBody={body}
      dataJson={creaturesJson}
      localStorageName="seacreatures"
      hemisphere={hemisphere}
      setHemisphere={setHemisphere}
    />
  );
};

SeaCreaturesTable.propTypes = propTypes;

export default SeaCreaturesTable;
