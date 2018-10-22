import React, { Component } from 'react';
import '../styles/Main.css';

import ChooseDecks from './ChooseDecks';
import ChooseGame from '../components/ChooseGame';
import Game from './Game';

class Main extends Component {
  state = {
    game: null,
    decks: [],
  }

  setDecks = (decks) => {
    this.setState({
      decks,
    });
  }

  setGame = (game) => {
    this.setState({
      game,
    });
  }

  renderCurrentComponents = () => {
    if (this.state.decks.length === 1 && this.state.decks[0] === 'Box') {
      alert('I JUST said that deck only has white cards. Do you want to play with only white cards? Too bad. Make your own game.');
    }
    else if (this.state.game) {
      return <Game decks={this.state.decks} gameState={this.state.game} />
    }
    else if (this.state.decks.length > 0) {
      return <ChooseGame setGame={this.setGame}/>
    }

    return (
      <React.Fragment>
        <h1 id='main-title'>Cards Against Humanity</h1>
        <ChooseDecks setDecks={this.setDecks} />
      </React.Fragment>
    )
  }

  render() {
    const current = this.renderCurrentComponents();
    return (
      <div className='Main'>
        {current}
      </div>
    )
  }
}

export default Main;
