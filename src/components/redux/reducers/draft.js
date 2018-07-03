import { FETCH_PLAYERS_REQUEST, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_ERROR, SEARCH_PLAYERS_SUCCESS, UNDO_DRAFT_SUCCESS, DRAFT_PLAYER_SUCCESS, RESET_DRAFT_SUCCESS, SAVE_TEAM_SUCCESS, END_DRAFT_SUCCESS, } from '../actions/data';

const initialState = {
    players: [],
    filteredPlayers: [],
    draftedPlayers: [],
    loading: false,
    currentDraft: 0,
    fetchError: null,
    format: 'standard',
    query: '',
    team: [],
};

export const draftReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLAYERS_REQUEST:
            return Object.assign({}, state, {
                loading: true
            })
        case FETCH_PLAYERS_SUCCESS:
            return Object.assign({}, state, {
                players: action.players.rankings,
                filteredPlayers: action.players.rankings,
                loading: false,
                fetchError: null,
                currentDraft: 0

            });
        case FETCH_PLAYERS_ERROR:
            return Object.assign({}, state, {
                fetchError: null
            });
        case SEARCH_PLAYERS_SUCCESS: {
            let players = state.players.filter(player =>
                player.Name.toLowerCase().includes(action.query.toLowerCase())
            );
            return Object.assign({}, state, {
                filteredPlayers: players,
                query: action.query,
            });
        }
        case DRAFT_PLAYER_SUCCESS:
            return Object.assign({}, state, {
                currentDraft: state.currentDraft + 1,
                draftedPlayers: [...state.draftedPlayers, action.player],
                player: action.player.drafted = state.currentDraft + 1,
                query: '',

            });
        case UNDO_DRAFT_SUCCESS:
            if (state.draftedPlayers.length === 0) {
                alert('Nothing to Undo');
                return state;
            }
            const isDrafted = state.players.filter(players => players.drafted === state.currentDraft)
            return Object.assign({}, state, {
                currentDraft: state.currentDraft - 1,
                player: isDrafted.forEach(function (player) {
                    player.drafted = null,
                        player.pick = null
                }),
                team: state.team.filter(players => players.drafted !== null),
                draftedPlayers: [...state.draftedPlayers.slice(0, state.currentDraft - 1), ...state.draftedPlayers.slice(state.currentDraft, + 1)],
                fetchError: null
            });
        case RESET_DRAFT_SUCCESS:
            if (state.draftedPlayers.length === 0) {
                alert('Nothing to Reset');
                return state;
            }
            const isDraftedReset = state.players.filter(players => players.drafted !== null)
            return Object.assign({}, state, {
                currentDraft: state.currentDraft = 0,
                player: isDraftedReset.forEach(function (player) {
                    player.drafted = null,
                        player.pick = null
                }),
                team: [],
                draftedPlayers: state.draftedPlayers = [],
                fetchError: null
            });
        case SAVE_TEAM_SUCCESS:
            return Object.assign({}, state, {
                team: [...state.team, action.team],
                player: action.team.pick = true,
            });
        case END_DRAFT_SUCCESS:
            const endDraft = state.players.filter(players => players.drafted !== null)
            return Object.assign({}, state, {
                player: endDraft.forEach(function (player) {
                    player.drafted = null,
                        player.pick = null
                }),
            });
    }
    return state;
};


