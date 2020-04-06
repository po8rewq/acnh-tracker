import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
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

const Wrapper = styled.div`
  button.active {
    background-color: #f0e8c0;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: #000;
  }

  button.active:hover {
    background-color: #f8f9fa;
  }

  button {
    cursor: pointer;
  }
`;

const supportedEvents = ['bunny_day', 'cherry_blossom'];

const RecipeList = () => {
  let { event } = useParams();
  const [list, setList] = useState([])
  const [title, setTitle] = useState();

  if (supportedEvents.indexOf(event) === -1) {
    throw new Error("Event not supported");
  }

  // TODO: find a better way?
  const [recipes, setRecipes] = useLocalStorage(`recipes`, { 'bunny_day': [], 'cherry_blossom': [] })

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
  }, [event])

  const toggleRecipe = (id) => {
    const index = (recipes[event] || []).indexOf(id);
    if (index === -1) {
      const newobj = { ...recipes };
      newobj[event] = [...(newobj[event] || []), id]
      setRecipes(newobj);
    } else {
      const newobj = { ...recipes };
      const newArray = [...(newobj[event] || [])];
      newArray.splice(index, 1);
      newobj[event] = newArray
      setRecipes(newobj);
    }
  }

  const renderItem = (l) => {
    // if (event === 'bunny_day' && l.eggs) {
    //   return (
    //     <div style={{ display: 'flex', flexDirection: 'row' }}>
    //       <span>{l.name}</span>
    //       {Object.keys(l.eggs).map(key => {
    //         const value = l.eggs[key];
    //         let img = null;
    //         switch (key) {
    //           case 'earth': img = earthImg; break;
    //           case 'leaf': img = leafImg; break;
    //           case 'sky': img = skyImg; break;
    //           case 'stone': img = stoneImg; break;
    //           case 'water': img = waterImg; break;
    //           case 'wood': img = woodImg; break;
    //           default: break;
    //         }
    //         return <div key={key} style={{ margin: '0 10px' }}><img src={img} alt="" width="22" /><span>x{value}</span></div>
    //       })}
    //     </div>
    //   );
    // }
    return <span>{l.name}</span>
  }

  return (
    <Wrapper>
      <h3>{title}</h3>
      <p>
        <ProgressBar current={(recipes[event] || []).length} total={list.length} />
      </p>
      <ListGroup className={list}>
        {list.map(l => <ListGroupItem
          active={(recipes[event] || []).indexOf(l.id) !== -1}
          tag="button"
          action
          onClick={() => toggleRecipe(l.id)}
          key={l.id}>{renderItem(l)}</ListGroupItem>
        )}
      </ListGroup>
    </Wrapper>
  )
}

export default RecipeList;
