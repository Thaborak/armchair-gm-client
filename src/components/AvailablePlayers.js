import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NFLTable from './NFLTable'

export class AvailablePlayers extends React.Component {
  // takes players from NFL Table and sorts them if undrafted
  render() {
    let players
    if (this.props.players) {
      players = this.props.players.slice().filter(players => !players.drafted);
      if (this.props.Pos) {
        players = players.filter(p => p.Pos.includes(this.props.Pos));
      }
    }
    return (
              <NFLTable
                size={this.props.size}
                fields={['Rank', 'Tier', 'Pos', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.draft(player)}
              />
    );
  }
}


  AvailablePlayers.propTypes = {
    draft: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,

    size: PropTypes.number,
    position: PropTypes.string,
  };
 
const mapStateToProps = (state) => {
  return {
    players: state.draft.players,
  } 
}

export default connect()(AvailablePlayers)
