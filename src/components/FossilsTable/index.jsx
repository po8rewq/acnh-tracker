import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import useLocalStorage from '../../hooks/useLocalStorage';
import fossilsJson from '../../data/fossils.json';
import FossilIcons from './FossilIcon';
import Search from '../Search';
import ProgressBar from '../ProgressBar';
import { formatNameToImage } from '../../utils';

const BodyRow = styled.tr`
  cursor: pointer;

  ${p => p.checked && `
  background-color: #f0e8c0;
  `}

  td {
    vertical-align: middle;
  }
`;

const FossilsTable = () => {
  const [search, setSearch] = useState('');
  const [list, setList] = useState(fossilsJson.fossils); // only the list of fossils, not the groups
  const [fossils, setFossils] = useLocalStorage('fossils', []);

  useEffect(() => {
    const baseList = [...fossilsJson.fossils]
    const s = search.trimLeft().trimRight();
    const newValue = s === '' ? baseList : baseList.filter(v => v.name.toLowerCase().indexOf(s) !== -1);
    setList(newValue);
  }, [search])

  const onSearchChange = (value) => setSearch(value);

  const toggleFossils = (id) => {
    const index = fossils.indexOf(id);
    if (index === -1) {
      setFossils([...fossils, id]);
    } else {
      const newArray = [...fossils];
      newArray.splice(index, 1);
      setFossils(newArray);
    }
  }

  const renderGroup = (groupId) => list.reduce((acc, f) => {
    if (f.groupId !== groupId) return acc;
    const v = (
      <BodyRow
        key={`fossil_${f.id}`}
        onClick={() => toggleFossils(f.id)}
        checked={fossils.indexOf(f.id) !== -1}
      >
        <td><FossilIcons icon={formatNameToImage(f.name)} /></td>
        <td>{f.name}</td>
        <td>{f.price}</td>
      </BodyRow>
    );
    return [...acc, v];
  }, [])

  const renderBody = () => fossilsJson.groups.map(group => {
    const content = renderGroup(group.id);
    if (content.length === 0) return null;
    return (
      <Fragment key={`group_${group.id}`}>
        <tr>
          <th colSpan="3" style={{ textAlign: "center" }}>{group.name}</th>
        </tr>
        {content}
      </Fragment>
    )
  })

  return (
    <>
      <p>
        <Search value={search} onChange={onSearchChange} />
      </p>
      <p>
        <ProgressBar current={fossils.length} total={fossilsJson.fossils.length} />
      </p>
      <Table size="sm" hover borderless responsive>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </Table>
    </>
  )
}

export default FossilsTable;