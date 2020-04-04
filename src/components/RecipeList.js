import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import bunnyday from '../data/bunny_day.json';
import cherryblossom from '../data/cherry_blossom.json';
import useLocalStorage from '../hooks/useLocalStorage';
import ProgressBar from './ProgressBar';

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

const RecipeList = () => {
  let { event } = useParams();
  const [list, setList] = useState([])
  const [title, setTitle] = useState();
  const [recipes, setRecipes] = useLocalStorage(`${event}_recipes`, [])

  useEffect(() => {
    switch (event) {
      case 'bunny_day':
        setTitle('Bunny Day');
        setList(bunnyday);
        break;
      case 'cherry_blossom':
        setTitle('Cherry-blossom');
        setList(cherryblossom);
      default: break;
    }
  }, [event])

  const toggleRecipe = (id) => {
    const index = recipes.indexOf(id);
    if (index === -1) {
      setRecipes([...recipes, id]);
    } else {
      const newArray = [...recipes];
      newArray.splice(index, 1);
      setRecipes(newArray);
    }
  }

  return (
    <Wrapper>
      <h3>{title}</h3>
      <p>
        <ProgressBar current={recipes.length} total={list.length} />
      </p>
      <ListGroup className={list}>
        {list.map(l => <ListGroupItem
          active={recipes.indexOf(l.id) !== -1}
          tag="button"
          action
          onClick={() => toggleRecipe(l.id)}
          key={l.id}>{l.name}</ListGroupItem>
        )}
      </ListGroup>
    </Wrapper>
  )
}

export default RecipeList;
