import React, { Component } from 'react';

class DeckChoice extends Component {
  render() {
    const toggle = () => {this.props.toggleSelected(this.props.deck)}
    return (
      <div className='deck-choice'>
        <input name={this.props.deck} type='checkbox' value={this.props.deck}
          onChange={toggle} checked={this.props.checked}
        />
        <label htmlFor={this.props.deck} onClick={toggle}>{this.props.description}</label>
      </div>
    )
  }
}

export default DeckChoice;
