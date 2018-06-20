import React from 'react';
import PropTypes from 'prop-types';
import NFLTable from './NFLTable'
import { connect } from 'react-redux';


export default class DraftedPlayers extends React.Component {
  render() {
    let currentDraft = 0;
    let players
    if (this.props.players) {
      let players = this.props.players.slice().filter(players => this.props.players.drafted);
      players = players.sort((a, b) => b.drafted - a.drafted);
    }
    console.log(this.props);

    return (
      <div className='column4'>
        <div className='PositionTitle'>Draft History</div>
        <div className='buttons'>
          {/* ======UNDO Button =====  */}
          <button className='button1' onClick={() => this.props.undo()}>Undo</button>
          {/* ========= RESET BUTTON ========= */}
          <button className='button2' onClick={() => this.props.reset()}>Reset</button>
          {/* =======SAVE TEAM FEATURE ========= */}
          <button className='button3' onClick={(team) => this.props.save(this.props.team)}>Save Team & End Draft</button>
        </div>
        <div className='padding-table draft'>
          <NFLTable
            fields={['Name', 'Pos', 'Bye']}
            players={this.props.players}
            disableColor={true}
            onClick={(draftedPlayers) => this.props.save(this.props.team)}
          />
        </div>
      </div>
    );
  }
}


DraftedPlayers.propTypes = {
  currentDraft: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  addPlayers: PropTypes.func.isRequired,
};


connect()(DraftedPlayers);

