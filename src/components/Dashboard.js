import React from 'react';
import { connect } from 'react-redux';
import './Dashboard.css';
import NFLTable from './NFLTable';
import { fetchPlayers, fetchPlayersRequest, searchPlayerSuccess, draftPlayerSuccess, undoPlayerSuccess, reset, save, filterPlayerSuccess, resetDraftSuccess, saveTeamSuccess, addPlayer, undo, draft, getTeam } from './redux/actions/data'
import { fetchUser, logoutUser } from './redux/actions/auth';



export class Dashboard extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchPlayers())
        this.props.dispatch(fetchUser())
    }


    render() {
            return (

                <div>  <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                    <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">ArmChair-GM Fantasy Football</a>
                    <ul class="navbar-nav px-3">
                        <li class="nav-item text-nowrap">
                            <a class="nav-link" href="#">Sign out</a>
                        </li>
                    </ul>
                </nav>
                    <div class="container-fluid">

                        <div class="row">
                            <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                                <div class="sidebar-sticky">
                                    <ul class="nav flex-column">
                                        <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                            <span>Draft Tools</span>
                                            <a class="d-flex align-items-center text-muted" href="#">
                                                <span data-feather="plus-circle"></span>
                                            </a>
                                        </h6>
                                        <li class="nav-item">
                                            <a class="nav-link" href="/draft#">
                                                <span data-feather="file"></span>
                                                Draft Cheatsheet
                </a>
                                        </li>
                                        {/* <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="shopping-cart"></span>
                                        Products
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="users"></span>
                                        Customers
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="bar-chart-2"></span>
                                        Reports
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="layers"></span>
                                        Integrations
                </a>
                                </li> */}
                                    </ul>

                                    {/* <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                                <span>Saved reports</span>
                                <a class="d-flex align-items-center text-muted" href="#">
                                    <span data-feather="plus-circle"></span>
                                </a>
                            </h6> */}
                                    {/* <ul class="nav flex-column mb-2">
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
                                        Current month
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
                                        Last quarter
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
                                        Social engagement
                </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        <span data-feather="file-text"></span>
                                        Year-end sale
                </a>
                                </li>
                            </ul> */}
                                </div>
                            </nav>

                            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
                                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 class="h2">Dashboard</h1>
                                    <div class="btn-toolbar mb-2 mb-md-0">
                                        <div class="btn-group mr-2">
                                            <button class="btn btn-sm btn-outline-secondary">Share</button>
                                            <button class="btn btn-sm btn-outline-secondary">Export</button>
                                        </div>
                                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                                            <span data-feather="calendar"></span>
                                            This week
              </button>
                                    </div>
                                </div>

                                {/* <canvas class="my-4 w-100" id={NFLTable} width="900" height="380"></canvas> */}

                                <h2>My Team</h2>
                                <div class="table-responsive">
                                    {/* <table class="table table-striped table-sm"> */}
                                    <NFLTable
                                        players={this.props.team}
                                        onClick={(player) => this.props.dispatch(draft(player))}
                                        fetch={(e) => this.props.dispatch(fetchPlayers(e.target.value))}
                                        search={(e) => this.props.dispatch(searchPlayerSuccess(e.target.value))}
                                        query={this.props.query}
                                        fields={['Rank', 'Tier', 'Pos', 'Name', 'Bye']}
                                    />
                                    {/* </table> */}
                                </div>
                            </main>
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
        team: state.auth.team,
        googleID: state.auth.googleID
    }
}

export default connect(mapStateToProps)(Dashboard);
