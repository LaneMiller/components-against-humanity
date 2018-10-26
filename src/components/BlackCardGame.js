import React from 'react';
import '../styles/blackCardGame.css'
import Card from './Card';

const BlackCardGame = (props) => {
  return <Card card={props.card} color='black'/>
}

export default BlackCardGame;
