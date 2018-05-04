import { API_BASE_URL } from '../../../config.js';

export const FETCH_PLAYERS_REQUEST = 'FETCH_PLAYERS_REQUEST';
export const fetchPlayersRequest = () => ({
    type: FETCH_PLAYERS_REQUEST,
})

export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const fetchPlayersSuccess = players => ({
    type: FETCH_PLAYERS_SUCCESS,
    players
});

export const FETCH_PLAYERS_ERROR = 'FETCH_PLAYERS_ERROR';
export const fetchPlayersError = error => ({
    type: FETCH_PLAYERS_ERROR,
    error
});

export const FILTER_PLAYERS_SUCCESS = 'FILTER_PLAYER_SUCCESS';
export const filterPlayerSuccess = filteredPlayers => ({
    type: FILTER_PLAYERS_SUCCESS,
    filteredPlayers
})

export const SEARCH_PLAYERS_SUCCESS = 'SEARCH_PLAYER_SUCCESS';
export const searchPlayerSuccess = query => ({
    type: SEARCH_PLAYERS_SUCCESS,
    query
})

export const UNDO_DRAFT_SUCCESS = 'UNDO_DRAFT_SUCCESS';
export const undoPlayerSuccess = currentDraft => ({
    type: UNDO_DRAFT_SUCCESS,
    currentDraft
})

export const DRAFT_PLAYER_SUCCESS = 'DRAFT_PLAYER_SUCCESS';
export const draftPlayerSuccess = player => ({
    type: DRAFT_PLAYER_SUCCESS,
    player
})



// coming soon ability to switch to ppr rankings
export const SWITCH_DRAFT_FORMAT_SUCCESS = 'SWITCH_DRAFT_FORMAT_SUCCESS';
export const switchDraftFormatSuccess = format => ({
    type: SWITCH_DRAFT_FORMAT_SUCCESS,
    format
})

export const RESET_DRAFT_SUCCESS = 'RESET_DRAFT_SUCCESS';
export const resetDraftSuccess = () => ({
    type: RESET_DRAFT_SUCCESS,
}) 



export const fetchPlayers = () => (dispatch, getState) => {
  dispatch(fetchPlayersRequest())
    const url = `${API_BASE_URL}/rankings`;
    fetch(url, {
        method: 'GET',
    }).then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json()
    })
        .then(players => dispatch(fetchPlayersSuccess(players)))
        .catch(err => dispatch(fetchPlayersError(err)));
}

export const searchPlayers = query => (dispatch) => {
    console.log(query)
        .then(query => dispatch(searchPlayerSuccess(query)))
}

export const draft = (player) => (dispatch) => {
    console.log(player)
        .then(player => dispatch(draftPlayerSuccess(player)))
}

export const undo = (currentDraft) => (dispatch) => {
     console.log(currentDraft)
        .then(currentDraft => dispatch(undoPlayerSuccess(currentDraft)))
}

export const reset = (dispatch) => {
    console.log('Reset Board')
        .then(() => dispatch(resetDraftSuccess()))
}
export const save = () => {
    //========= coming soon =======//
    // this.props.dispatch(this.addPlayer(this.props.players));
}
