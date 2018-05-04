import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NFLTable from './NFLTable'

export class AvailablePlayers extends React.Component {
  render() {
   let players
    if (this.props.players) {
     console.log(this.props)
       players = this.props.players.slice().filter(players => !players.drafted);
      if (this.props.Pos) {
       players = players.filter(p => p.Pos.includes(this.props.Pos));
      }
    }
  
 

    
    return (
      <NFLTable
        size={this.props.size}
        fields={this.props.fields}
        players={players}
        onClick={(p) => this.props.draft(p)}
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
  // console.log(state.draft.players);
  return {
    players: state.draft.players,
  } 
}

export default connect()(AvailablePlayers)
