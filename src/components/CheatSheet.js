import React from 'react';

// import { addPlayer } from './redux/actions/team'
import { connect } from 'react-redux';
import { fetchPlayers, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess, saveTeamSuccess, addPlayer, undo, draft } from './redux/actions/data'
import { fetchUser, logoutUser } from './redux/actions/auth';
import Spinner from 'react-spinkit';
import BestAvailablePlayers from './BestAvailablePlayers';
import AvailablePlayers from './AvailablePlayers'
import DraftedPlayers from './DraftedPlayers';
import './CheatSheet.css';

export class CheatSheet extends React.Component {
  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(fetchPlayers());
    this.props.dispatch(fetchUser());

  }
  render() {
    if (this.props.loading) {
      return <Spinner className="spinner" name="circle" fadeIn='none' />;
    }

    if (this.props.fetchError) {
      return (<div className='row'>error fetching rankings...</div>)
    }

    return (

      <div class="container">

        <h1>The Draft Board</h1>
        <p class="lead">Click on each player to draft them as along side your live draft</p>
        <div class="row">
          {/* cheatSheet table table-bordered table-striped player-table table-hover pad-below tablesorter" */}
          <div class="col-md-3">
            <h2 className='PositionTitle'>Best Available</h2>
            <BestAvailablePlayers
              players={this.props.filteredPlayers}
              draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
              fetch={(e) => this.props.dispatch(fetchPlayers(e.target.value))}
              search={(e) => this.props.dispatch(searchPlayerSuccess(e.target.value))}
              query={this.props.query}
            />
          </div>

          <div className='col-md-3 '>
            <div className='padding-table'>
              <h3>Runningbacks</h3>
              <AvailablePlayers
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
                size={19}
                Pos='RB'
              />

              <h3>Wide Receivers</h3>
              <AvailablePlayers
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
                size={19}
                Pos='WR'
              />
            </div>
          </div>

          <div className='col-md-3'>
            <div className='padding-table'>
              <h3>Quarterbacks</h3>
              <AvailablePlayers
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
                size={19}
                Pos='QB'
              />
              <h3>Tightends</h3>
              <AvailablePlayers
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(player) => this.props.dispatch(draftPlayerSuccess(player))}
                size={19}
                Pos='TE'
              />
            </div>
          </div>
          <div class="col-md-3">
            <h2 className='PositionTitle'>Draft History</h2>
            <DraftedPlayers
              currentDraft={this.props.currentDraft}
              players={this.props.draftedPlayers}
              undo={(currentDraft) => this.props.dispatch(undoPlayerSuccess(currentDraft))}
              reset={() => this.props.dispatch(resetDraftSuccess())}
              save={(players) => this.props.dispatch(save(players))}
              team={this.props.team}
              addPlayer={() => this.props.dispatch(addPlayer(this.props.team))}
            />
          </div>
        </div>
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
    team: state.draft.team,
    googleID: state.auth.googleID,
    userId: state.googleID,
  }
}



export default (connect(mapStateToProps)(CheatSheet));




