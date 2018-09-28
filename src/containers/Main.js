import React, { Component } from 'react';
import Card from '../components/Card';
import WhiteCardsContainer from './WhiteCardsContainer';

import '../styles/main.css';
import {fetchAdapter} from '../adapters/fetchAdapter';

let counter = 1.1;
class Main extends Component {
  componentDidMount() {
    fetchAdapter.loadCards()
      .then(json => {
        const white = json.white.filter(card => card.deck === 'Base');
        const black = json.black.filter(card => card.deck === 'Base');
        return [black, white];
      })
      .then(([black, white]) => {
        const [ blackCard, whiteCards ] = this.draw(black, white);

        this.setState({
          deck: { black, white },
          blackCard,
          whiteCards,
          warnings: ["Slow down there, bucko", "You done?", "There, you broke it. Happy?"]
        });
      })
  }

  draw = (black, white) => {
    const blackCard = black[this.randomizeCard(black)];
    const whiteCards = [];

    for (let i = 0; i < blackCard.pick; i++ ) {
      whiteCards.push(white[this.randomizeCard(white)]);
    }

    return [
      blackCard,
      whiteCards,
    ]
  }

  randomizeCard = (color) => {
    return Math.floor(Math.random() * color.length);
  }

  nextTurn = () => {
    try {
      const { black, white } = this.state.deck;
      const [ blackCard, whiteCards ] = this.draw(black, white);

      this.setState({
        blackCard,
        whiteCards,
      });
    } catch (e) {
      const warn = this.state.warnings[this.randomizeCard(this.state.warnings)];
      alert(warn);
    }
  }

  drawWhiteCards = () => {
    try {
      const { blackCard, deck } = this.state;
      const whiteCards = [];

      for (let i = 0; i < blackCard.pick; i++ ) {
        whiteCards.push(deck.white[this.randomizeCard(deck.white)]);
      }

      this.setState({
        whiteCards: [...whiteCards]
      });
    } catch (e) {
      const warn = this.state.warnings[this.randomizeCard(this.state.warnings)];
      alert(warn);
    }
  }

  renderCards = () => (
    [
      <Card key={counter++} card={this.state.blackCard} color='black'/>,
      <WhiteCardsContainer key={counter++} cards={this.state.whiteCards}/>
    ]
  )

  render() {
    const cards = this.state ? this.renderCards() : null;

    return (
      <div id='Main'>
        <h1 className='title'>Cards Against Humanity</h1>
        <div className='cards'>
          {cards}
        </div>
        <div className='buttons'>
          <button onClick={this.nextTurn} className='button'>Next Turn</button>
          <button onClick={this.drawWhiteCards} className='button'>New White Card(s)</button>
        </div>
      </div>
    )
  }
}

export default Main;
