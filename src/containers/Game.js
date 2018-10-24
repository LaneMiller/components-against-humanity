import React, { Component } from 'react';
import { fetchAdapter } from '../adapters/fetchAdapter';
import '../styles/game.css';

import Card from '../components/Card';
import WhiteCardsContainer from './WhiteCardsContainer';

let counter = 1.1;
class Game extends Component {
  state = {
    blackCard: {text: ''},
    whiteCards: [{text: ''}],
    selectedCards: [],
    usedBlackCards: [],
    usedWhiteCards: [],
    mulligans: 1,
  }

  componentDidMount() {
    fetchAdapter.loadCards()
      .then(json => {
        const white = this.filterCards(json.white, this.props.decks);
        const black = this.filterCards(json.black, this.props.decks);
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

  filterCards = (allCards, decks) => {
    return allCards.filter(card => {
      const bools = decks.map(deck => deck === card.deck)
      if (bools.includes(true)) {
        return true;
      }
      return false;
    });
  }

  reshuffle = (black, white) => {
    const { usedBlackCards, usedWhiteCards } = this.state;
    if (usedBlackCards.length === black.length) {
      this.setState({ usedBlackCards: [] })
    }
    if (usedWhiteCards.length === white.length) {
      this.setState({ usedWhiteCards: [] })
    }
  }

  draw = (black, white) => {
    this.reshuffle(black, white)

    let blackCard = black[this.randomizeCard(black)];

    while (this.state.usedBlackCards.includes(blackCard)) {
      blackCard = black[this.randomizeCard(black)];
    }

    let whiteCards = [];
    // for (let i = 0; i < 7; i++ ) {
    while (whiteCards.length < 8) {
      let whiteCard = white[this.randomizeCard(white)]

      while (this.state.usedWhiteCards.includes(whiteCard)) {
        whiteCard = white[this.randomizeCard(white)]
      }
      whiteCards.push(whiteCard);
    }

    return [
      blackCard,
      whiteCards,
    ]
  }

  randomizeCard = (color) => {
    return Math.floor(Math.random() * color.length);
  }

  selectCard = (card) => {
    const { selectedCards, blackCard } = this.state;
    const pick = blackCard.text === "Make a haiku." ? 3 : blackCard.pick;

    if (selectedCards.find(obj => obj.text === card.text)) {
      const filtered = selectedCards.filter(obj => obj.text !== card.text)
      this.setState({
        selectedCards: filtered,
      })
    }
    else if (selectedCards.length < pick) {
      this.setState({
        selectedCards: [...selectedCards, card]
      })
    }
    else if (selectedCards.length === pick) {
      this.setState({
        selectedCards: [...selectedCards.slice(1), card]
      })
    }
  }

  nextTurn = () => {
    try {
      const { black, white } = this.state.deck;
      const [ blackCard, whiteCards ] = this.draw(black, white);

      this.setState({
        blackCard,
        whiteCards,
        selectedCards: [],
        usedBlackCards: [...this.state.usedBlackCards, this.state.blackCard],
        usedWhiteCards: [...this.state.usedWhiteCards, ...this.state.whiteCards],
      });
    } catch (e) {
      const warn = this.state.warnings[this.randomizeCard(this.state.warnings)];
      alert(warn);
    }
  }

  drawWhiteCards = () => {
    if (this.state.mulligans > 0) {
      try {
        const { blackCard, deck } = this.state;
        const whiteCards = [];

        while (whiteCards.length < 8) {
          whiteCards.push(deck.white[this.randomizeCard(deck.white)]);
        }

        this.setState({
          whiteCards: [...whiteCards],
          selectedCards: [],
          usedWhiteCards: [...this.state.usedWhiteCards, ...this.state.whiteCards],
          mulligans: this.state.mulligans - 1,
        });
      } catch (e) {
        const warn = this.state.warnings[this.randomizeCard(this.state.warnings)];
        alert(warn);
      }
    } else {
      alert("You're out of time-reversal cubes!")
    }

  }

  renderCards = () => {
    if (this.props.gameState === 'Black Cards Only') {
      return <Card key={counter++} card={this.state.blackCard} color='black'/>
    }
    return [
      <Card key={counter++} card={this.state.blackCard} color='black'/>,
      <WhiteCardsContainer key={counter++} cards={this.state.whiteCards} selectCard={this.selectCard} selectedCards={this.state.selectedCards}/>
    ]
  }

  renderButtons = () => {
    if (this.props.gameState === 'Black Cards Only') {
      return <button onClick={this.nextTurn} className='button'>Next Turn</button>
    }
    return [
      <button key='next' onClick={this.nextTurn} className='button'>Next Turn</button>,
      <button key='new' onClick={this.drawWhiteCards} className='button'>New White Card(s)</button>
    ]
  }

  render() {
    const cards = this.state ? this.renderCards() : null;
    const buttons = this.renderButtons();

    return (
      <div id='game'>
        <h1 className='title'>Cards Against Humanity</h1>
        <div className='cards'>
          {cards}
        </div>
        <div className='buttons'>
          {buttons}
        </div>
      </div>
    )
  }
  }

export default Game;
