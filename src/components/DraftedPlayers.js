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

    return (
      <div className='column4'>
        <div className='PositionTitle'>Draft History</div>
        <div className='buttons'>
          {/* ======UNDO Button =====  */}
          <button className='button1' onClick={() => this.props.undo()}>Undo</button>
          {/* ========= RESET BUTTON ========= */}
          <button className='button2' onClick={() => this.props.reset()}>Reset</button>
          {/* =======SAVE TEAM FEATURE ========= */}
<<<<<<< Updated upstream
          <button className='button3' onClick={() => this.props.save()}>Save Team & End Draft</button>
=======
          <button className='button3' onClick={(team) => this.props.save(this.props.team)}>Save Team & End Draft</button>
>>>>>>> Stashed changes
        </div>
        <div className='padding-table draft'>
          <NFLTable
            fields={['Name', 'Pos', 'Bye']}
            players={this.props.players}
            disableColor={true}
<<<<<<< Updated upstream
            onClick={(p) => this.props.Team(p)}
=======
            onClick={(draftedPlayers) => this.props.save(draftedPlayers)}
>>>>>>> Stashed changes
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

