import React, { Component } from 'react';
import Card from '../components/Card';

let counter = 1.2;
class WhiteCardsContainer extends Component {
  renderWhiteCards = () => (
    this.props.cards.map(card => <Card key={counter++} card={card} color='white'/>)
  )

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
