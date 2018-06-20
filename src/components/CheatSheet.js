import React from 'react';

// import { addPlayer } from './redux/actions/team'
import { connect } from 'react-redux';
import { fetchPlayers, fetchPlayersRequest, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess, saveTeamSuccess, addPlayer, undo, draft } from './redux/actions/data'
import { fetchUser, logoutUser } from './redux/actions/auth';
import Spinner from 'react-spinkit';
import AvailablePlayers from './AvailablePlayers';
import NFLTable from './NFLTable'
import { Cookies } from 'js-cookie';
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

    let currentDraft = 0;
    let players


    if (this.props.players) {
      players = this.props.players.slice().filter(players => !players.drafted);
      if (this.props.Pos) {
        players = players.filter(p => p.Pos.includes(this.props.Pos));
        if (this.props.size) {
          players = players.slice(0, this.props.size);
        }
      }
    }
    if (this.props.draftedPlayers) {
      let players = this.props.players.slice().filter(players => this.props.players.drafted);
      players = players.sort((a, b) => b.drafted - a.drafted);
    }


    return (

      <div class="container">

        <h1>The Draft Board</h1>
        <p class="lead">Click on each player to draft them as along side your live draft</p>
        <div class="row">
          {/* cheatSheet table table-bordered table-striped player-table table-hover pad-below tablesorter" */}
          <div class="col-md-4">
            <h2 className='PositionTitle'>Best Available</h2>
            <input class="form-control mr-sm-2" type="search" placeholder="Search By Top Players ex: 'Todd Gurley" aria-label="Search" onChange={this.search}
              value={this.query}></input>
            <NFLTable
              players={this.props.filteredPlayers}
              onClick={(player) => this.props.dispatch(draft(player))}
              fetch={(e) => this.props.dispatch(fetchPlayers(e.target.value))}
              search={(e) => this.props.dispatch(searchPlayerSuccess(e.target.value))}
              query={this.props.query}
              fields={['Rank', 'Tier', 'Pos', 'Name', 'Bye']}
            />
          </div>



          <div class="col-md-4">
            <h2 className='PositionTitle'>Best by Position</h2>
            <div className='padding-table'>
              <span>Runningbacks</span>
              <NFLTable
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                onClick={(players) => this.props.dispatch(draft(players))}
                size={15}
                Pos='RB'
              />
            </div>

            <div className='padding-table'>
              <span>Wide Receivers</span>
              <NFLTable
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(players) => this.props.dispatch(draft(players))} size={15}
                Pos='WR'
              />
            </div>
            <div className='padding-table'>
              <span>Quarterbacks</span>
              <NFLTable
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(players) => this.props.dispatch(draft(players))} size={15}
                Pos='QB'
              />
            </div>
            <div className='padding-table'>
              <span>Tightends</span>
              <NFLTable
                fields={['Tier', 'Name', 'Bye']}
                players={this.props.players}
                draft={(players) => this.props.dispatch(draft(players))} size={15}
                Pos='TE'
              />
            </div>
          </div>
          <div class="col-md-4">
            <h2 className='PositionTitle'>Draft History</h2>
            <div className='buttons'>
              {/* ======UNDO Button =====  */}
              <button className='button1' onClick={() => this.props.dispatch(undo())}>Undo</button>
              {/* ========= RESET BUTTON ========= */}
              <button className='button2' onClick={() => this.props.dispatch(reset())}>Reset</button>
              {/* =======SAVE TEAM FEATURE ========= */}
              <button className='button3' onClick={(team) => this.props.dispatch(save(this.props.team))}>Save Team & End Draft</button>
            </div>
            <NFLTable
              currentDraft={this.props.currentDraft}
              fields={['Tier', 'Name', 'Bye']}
              players={this.props.draftedPlayers}
              undo={(currentDraft) => this.props.dispatch(undoPlayerSuccess(currentDraft))}
              reset={() => this.props.dispatch(resetDraftSuccess())}
              save={(players) => this.props.dispatch(addPlayer(players))}
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




