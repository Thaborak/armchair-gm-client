import React, { Component } from 'react';

import BestAvailablePlayers from './BestAvailablePlayers'
import BestAvailablePlayersByPosition from './BestAvailablePlayersByPosition'
import DraftedPlayers from './DraftedPlayers'
// import { addPlayer } from './redux/actions/team'
import { connect } from 'react-redux';
<<<<<<< Updated upstream
import { fetchPlayers, fetchPlayersRequest, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess, saveTeamSuccess } from './redux/actions/data'
=======
import { fetchPlayers, fetchPlayersRequest, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess, saveTeamSuccess, addPlayer } from './redux/actions/data'
import { fetchUser, logoutUser } from './redux/actions/auth';
>>>>>>> Stashed changes
import Spinner from 'react-spinkit';
import AvailablePlayers from './AvailablePlayers';
import NFLTable from './NFLTable'
export class CheatSheet extends React.Component {
  componentDidMount() {
<<<<<<< Updated upstream
    this.props.dispatch(fetchPlayers());
    console.log(`%c

 /$$$$$$$$                            /$$   /$$           /$$                                    /$$      
|__  $$__/                           | $$  | $$          | $$                                   | $$      
   | $$  /$$$$$$  /$$$$$$/$$$$       | $$  | $$  /$$$$$$ | $$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$ | $$   /$$
   | $$ /$$__  $$| $$_  $$_  $$      | $$$$$$$$ |____  $$| $$__  $$ /$$__  $$ /$$__  $$|____  $$| $$  /$$/
   | $$| $$    $$| $$   $$   $$      | $$__  $$  /$$$$$$$| $$    $$| $$    $$| $$    _/ /$$$$$$$| $$$$$$/ 
   | $$| $$  | $$| $$ | $$ | $$      | $$  | $$ /$$__  $$| $$  | $$| $$  | $$| $$      /$$__  $$| $$_  $$ 
   | $$|  $$$$$$/| $$ | $$ | $$      | $$  | $$|  $$$$$$$| $$$$$$$/|  $$$$$$/| $$     |  $$$$$$$| $$    $$
   |__/   _____/ |__/ |__/ |__/      |__/  |__/  ______/|_______/    _____/ |__/        ______/|__/    _/
                                                                                                          
                                                                                                          
                                                                                                           `, "font-family:monospace");

console.log("%chttps://www.linkedin.com/in/tom-h-759579a5", "color: blue; font-size: x-large");
=======
    console.log(this.props);
    this.props.dispatch(fetchPlayers());
    this.props.dispatch(fetchUser());

>>>>>>> Stashed changes
  }
  render() {
    if (this.props.loading) {
      return <Spinner Name="circle" fadeIn='none' />;
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
<<<<<<< Updated upstream
          save={(team) => this.props.dispatch(saveTeamSuccess(team))}
=======
          save={(players) => this.props.dispatch(addPlayer(players))}
>>>>>>> Stashed changes
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.draft.players,
    filteredPlayers: state.draft.filteredPlayers,
    currentDraft: state.draft.currentDraft,
    query: state.draft.query,
    draftedPlayers: state.draft.draftedPlayers,
    loading: state.draft.loading,
    team: state.draft.team
  }
}



export default (connect(mapStateToProps)(CheatSheet));




