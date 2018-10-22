import React, { Component } from 'react';

class ChooseGame extends Component {
  getGame = (e) => {
    if (e.target.innerText === 'Black Cards Only') {
      this.props.setGame('Black Cards Only');
    } else {
      this.props.setGame('Full Game');
    }
  }

  render() {
    return (
      <div className='choose-game'>
        <button onClick={this.getGame}>Black Cards Only</button>
        <button onClick={this.getGame}>Full Game</button>
      </div>
    )
  }
}

export default ChooseGame;
