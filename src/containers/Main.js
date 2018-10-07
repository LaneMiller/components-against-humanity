import React, { Component } from 'react';
import '../styles/title.css'

import ChooseDecks from './ChooseDecks';
import Game from './Game';

class Main extends Component {
  state = {
    decks: [],
  }

  setDecks = (decks) => {
    this.setState({
      decks,
    })
  }

  renderCurrentComponents = () => {
    if (this.state.decks.length > 0) {
      return <Game decks={this.state.decks} />
    } else {
      return (
        <React.Fragment>
          <h1 id='main-title'>Cards Against Humanity</h1>
          <ChooseDecks setDecks={this.setDecks}/>
        </React.Fragment>
      )
    }
  }

  render() {
    const current = this.renderCurrentComponents()
    return (
      <div className='Main'>
        {current}
      </div>
    )
  }
}

export default Main;
