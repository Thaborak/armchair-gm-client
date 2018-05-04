import React, { Component } from 'react';

import BestAvailablePlayers from './BestAvailablePlayers'
import BestAvailablePlayersByPosition from './BestAvailablePlayersByPosition'
import DraftedPlayers from './DraftedPlayers'
import { addPlayer } from './redux/actions/team'
import { connect } from 'react-redux';
import { fetchPlayers, fetchPlayersRequest, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess } from './redux/actions/data'
import Spinner from 'react-spinkit';
import AvailablePlayers from './AvailablePlayers';
import NFLTable from './NFLTable'
export class CheatSheet extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPlayers());
  }
  render() {
    console.log(this.props);
    if (this.props.loading) {
      return <Spinner spinnerName="circle" noFadeIn />;
    }

    if (this.props.fetchError) {
      return (<div className='row'>error fetching rankings...</div>)
    }
    return (

      <div className='row cheatSheet table table-bordered table-striped player-table table-hover pad-below tablesorter'>
        <BestAvailablePlayers
          players={this.props.filteredPlayers}
          draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
          fetch={(e) => this.props.dispatch(fetchPlayers(e.target.value))}
          search={(e) => this.props.dispatch(searchPlayerSuccess(e.target.value))}
          query={this.props.query}
        />

        <BestAvailablePlayersByPosition
          players={this.props.players}
          draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
        />

        <DraftedPlayers
          currentDraft={this.props.currentDraft}
          players={this.props.draftedPlayers}
          undo={(currentDraft) => this.props.dispatch(undoPlayerSuccess(currentDraft))}
          reset={() => this.props.dispatch(resetDraftSuccess())}
          save={() => this.props.save()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.draft.players);
  return {
    players: state.draft.players,
    filteredPlayers: state.draft.filteredPlayers,
    currentDraft: state.draft.currentDraft,
    query: state.draft.query,
    draftedPlayers: state.draft.draftedPlayers
  }
}




export default (connect(mapStateToProps)(CheatSheet));




