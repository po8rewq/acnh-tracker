import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import bunnyday from '../../data/bunny_day.json';
import cherryblossom from '../../data/cherry_blossom.json';
import useLocalStorage from '../../hooks/useLocalStorage';
import ProgressBar from '../ProgressBar';

import waterImg from './img/water.jpg';
import earthImg from './img/earth.jpg';
import leafImg from './img/leaf.jpg';
import woodImg from './img/wood.jpg';
import skyImg from './img/sky.jpg';
import stoneImg from './img/stone.jpg';

const BodyRow = styled.tr`
  ${(p) => p.checked && `
  background-color: #f0e8c0;
  `}
  cursor: pointer;
`;

const Recipe = styled.td`
  display: flex;
  flex-direction: row;
  div {
    margin: 0 10px;
  }
`;

const Ctr = styled.div`
  margin: 15px 0;
`;

const supportedEvents = ['bunny_day', 'cherry_blossom'];

const RecipeList = () => {
  const { event } = useParams();
  const [list, setList] = useState([]);
  const [title, setTitle] = useState();

  if (supportedEvents.indexOf(event) === -1) {
    throw new Error('Event not supported');
  }

  // TODO: find a clever way
  const [recipes, setRecipes] = useLocalStorage('recipes', { bunny_day: [], cherry_blossom: [] });

  useEffect(() => {
    switch (event) {
      case 'bunny_day':
        setTitle('Bunny Day');
        setList(bunnyday);
        break;
      case 'cherry_blossom':
        setTitle('Cherry-blossom');
        setList(cherryblossom);
        break;
      default: break;
    }
  }, [event]);

  const toggleRecipe = (id) => {
    const index = (recipes[event] || []).indexOf(id);
    if (index === -1) {
      const newobj = { ...recipes };
      newobj[event] = [...(newobj[event] || []), id];
      setRecipes(newobj);
    } else {
      const newobj = { ...recipes };
      const newArray = [...(newobj[event] || [])];
      newArray.splice(index, 1);
      newobj[event] = newArray;
      setRecipes(newobj);
    }
  };

  const renderHeader = () => {
    if (event === 'bunny_day') {
      return (
        <>
          <th>Name</th>
          <th>Recipe</th>
          <th>Price</th>
        </>
      );
    }
    return <th>Name</th>;
  };

  const renderItem = (l) => {
    if (event === 'bunny_day') {
      return (
        <>
          <td>{l.name}</td>
          <Recipe>
            {l.eggs && Object.keys(l.eggs).map((key) => {
              const value = l.eggs[key];
              let img = null;
              switch (key) {
                case 'earth': img = earthImg; break;
                case 'leaf': img = leafImg; break;
                case 'sky': img = skyImg; break;
                case 'stone': img = stoneImg; break;
                case 'water': img = waterImg; break;
                case 'wood': img = woodImg; break;
                default: break;
              }
              return (
                <div key={key}>
                  <img src={img} alt="" width="22" />
                  <span>
                    x
                    {value}
                  </span>
                </div>
              );
            })}
          </Recipe>
          <td>{l.price}</td>
        </>
      );
    }
    return <td>{l.name}</td>;
  };

  return (
    <>
      <h3>{title}</h3>
      <Ctr>
        <ProgressBar current={(recipes[event] || []).length} total={list.length} />
      </Ctr>
      <Table size="sm" hover borderless responsive>
        <thead>
          <tr>
            {renderHeader()}
          </tr>
        </thead>
        <tbody>
          {list.map((l) => (
            <BodyRow
              checked={(recipes[event] || []).indexOf(l.id) !== -1}
              onClick={() => toggleRecipe(l.id)}
              key={l.id}
            >
              {renderItem(l)}
            </BodyRow>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RecipeList;
