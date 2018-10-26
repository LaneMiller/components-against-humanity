import React, { Component } from 'react';
import Card from '../components/Card';

let counter = 1.2;
class WhiteCardsContainer extends Component {
  renderWhiteCards = () => {
    const { selectCard, selectedCards } = this.props;

    return this.props.cards.map(card => {
      const selected = selectedCards.find(obj => obj.text === card.text) ? true : false;

      return <Card key={counter++} card={card} color='white' selectCard={selectCard} selected={selected} />
    })
  }

  render() {
    const whiteCards = this.renderWhiteCards()
    return (
      <div className='white-card-container'>
        {whiteCards}
      </div>
    )
  }
}

export default WhiteCardsContainer;
