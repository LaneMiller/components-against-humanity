import React, { Component } from 'react';

class DeckChoice extends Component {
  render() {
    return (
      <div className='deck-choice'>
        <input name={this.props.deck} type='checkbox' value={this.props.deck}
          onClick={() => {this.props.toggleSelected(this.props.deck)}}
          checked={this.props.checked}
        />
        <label for={this.props.deck}>{this.props.description}</label>
      </div>
    )
  }
}

export default DeckChoice;
