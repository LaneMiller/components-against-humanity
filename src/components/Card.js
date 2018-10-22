import React, { Component } from 'react';

let counter = 1.3
class Card extends Component {
  render() {
    const text = this.props.card ? this.props.card.text : [`Cards`,<br/>,`Against`,<br/>,`Humanity`];
    const handler = this.props.color === 'white' ? () => this.props.selectCard(this.props.card) : null;
    const selected = this.props.selected ? 'selected' : null;

    return (
      <div card={this.props.card} className={`card ${this.props.color}-card ${selected}`} onClick={handler}>
        <p key={counter++}>{text}</p>
      </div>
    )
  }
}

export default Card;
