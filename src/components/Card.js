import React, { Component } from 'react';

let counter = 1.3
class Card extends Component {
  render() {
    const text = this.props.card ? this.props.card.text : 'Javascript is hard.';
    return (
      <div card={this.props.card} className={`card ${this.props.color}-card`}>
        <p key={counter++}>{text}</p>
      </div>
    )
  }
}

export default Card;
