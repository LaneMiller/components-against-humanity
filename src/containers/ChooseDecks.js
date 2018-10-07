import React, { Component } from 'react';
import { officialDecks } from '../adapters/officialDecks';

import DeckChoice from '../components/DeckChoice';

class ChooseDecks extends Component {
  state = {
    selected: [],
  }

  toggleSelected = (deck) => {
    if (!this.state.selected.includes(deck)) {
      this.setSelected(deck);
    } else {
      this.unsetSelected(deck);
    }
  }

  setSelected = (deck) => {
    this.setState({
      selected: [...this.state.selected, deck]
    });
  }

  unsetSelected = (unselected) => {
    const filtered = this.state.selected.filter((deck) => deck !== unselected)
    this.setState({
      selected: filtered,
    });
  }

  getDecks = (e) => {
    this.props.setDecks(this.state.selected);
  }

  resetChecks = (e) => {
    this.setState({ selected: [] })
  }

  renderDeckChoices = () => {
    const choices = [];
    for (let key in officialDecks) {
      const checked = this.state.selected.includes(key) ? true : false;
      choices.push(
        <DeckChoice key={key} deck={key} description={officialDecks[key]}
          toggleSelected={this.toggleSelected}
          setSelected={this.setSelected}
          unsetSelected={this.unsetSelected}
          checked={checked}
        />
      )
    }
    return choices;
  }

  render() {
    // console.log(this.state.selected);
    const choices = this.renderDeckChoices()
    
    return (
      <div className='choose-decks'>
        <h2 id='choose-decks-header'>
          Choose Decks:
        </h2>
        <div id='deck-choices'>
          {choices}
        </div>
        <div className='deck-choice-buttons'>
          <button onClick={this.resetChecks}>I did it bad</button>
          <button onClick={this.getDecks}>Let's Go</button>
        </div>
      </div>
    )
  }
}

export default ChooseDecks;
