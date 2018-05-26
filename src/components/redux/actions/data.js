import { API_BASE_URL } from '../../../config.js';
import "isomorphic-fetch";
import { fetchUserSuccess, fetchUserError } from './auth';
const Cookies = require("js-cookie");


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

export const SAVE_TEAM_SUCCESS = 'SAVE_TEAM_SUCCESS';
export const saveTeamSuccess = (team) => ({
    type: SAVE_TEAM_SUCCESS,
    team
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
export const save = (team) => (dispatch, getState) => {
    const authToken = getState().auth.googleID;
    console.log(authToken);
    return fetch(`${API_BASE_URL}/user/team`, {
        method: 'PUT',
        body: JSON.stringify(team),
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then((res) => res.json)
    console.log("Save Team")
    .then(() => dispatch(saveTeamSuccess()))
}
// PUT request to add player into user schema 
export const addPlayer = function (team) {
    return function (dispatch, getState) {
        const token = Cookies.get('accessToken');
        const googleID = getState().auth.googleID;
        const ok = getState().draft.team;
        console.log(ok);
        const url = `${API_BASE_URL}/user/${googleID}`;
        return fetch(url,
            {
                method: 'put',
                headers: { 'Content-type': 'application/json', 'Authorization': 'bearer ' + token },
                body: JSON.stringify({team})
            }
        ).then(function (response) {
            if (response.status < 200 || response.status > 300) {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
            .then(function (response) {
                return dispatch(
                    saveTeamSuccess(team)
                );
            })
            .catch(function (error) {
                return dispatch(
                    fetchUserError(error)
                );
            });
    };
};

// PUT request to remove player from user schema
export const removePlayer = function (props) {
    return function (dispatch) {
        const token = Cookies.get('accessToken');
        const player = props.player;
        const url = `/user/team/${player}`;
        return fetch(url,
            {
                method: 'put',
                headers: { 'Content-type': 'application/json', 'Authorization': 'bearer ' + token },
                body: JSON.stringify({
                    'googleID': props.googleID
                })
            }
        ).then(function (response) {
            if (response.status < 200 || response.status > 300) {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response.json();
        })
            .then(function (user) {
                return dispatch(
                    fetchUserSuccess(user)
                );
            })
            .catch(function (error) {
                return dispatch(
                    fetchUserError(error)
                );
            });
    };
};