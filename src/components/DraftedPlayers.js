import React from 'react';
import PropTypes from 'prop-types';
import NFLTable from './NFLTable'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import './DraftedPlayers.css';


export default class DraftedPlayers extends React.Component {
  render() {
    let currentDraft = 0;
    let players
    if (this.props.players) {
      let players = this.props.players.slice().filter(players => this.props.players.drafted);
      players = players.sort((a, b) => b.drafted - a.drafted);
    }
    return (
      <div className='buttons'>
          {/* ======UNDO Button =====  */}
          <button className='button' onClick={() => this.props.undo()}>Undo</button>
          {/* ========= RESET BUTTON ========= */}
        <button className='button' onClick={() => this.props.reset()}>Reset</button>
          {/* =======SAVE TEAM FEATURE ========= */}
        <button className='button' onClick={(team) => this.props.addPlayer(team)}><a href='/dashboard'>Save Team</a></button>
         <br />
        <div className='padding-table draft'>
          <NFLTable
            fields={['Name', 'Pos', 'Bye']}
            players={this.props.players}
            // className={this.props.players.pick === true ? 'selected' + ('tier' + player.Tier) : ('tier' + player.Tier)} 
            disableColor={true}
            onClick={(DraftedPlayers) => this.props.save(DraftedPlayers)}
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

