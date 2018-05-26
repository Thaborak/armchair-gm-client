import "isomorphic-fetch";
import { fetchUserSuccess, fetchUserError } from './auth';
import { API_BASE_URL } from '../../../config.js';



export const SAVE_TEAM_SUCCESS = 'SAVE_TEAM_SUCCESS';
export const saveTeamSuccess = (team) => ({
  type: SAVE_TEAM_SUCCESS,
  team
})

const Cookies = require("js-cookie");
// PUT request to add player into user schema 
export const addPlayer = function (team) {
  return function (dispatch, getState) {
    const token = Cookies.get('accessToken');
    const googleID = getState().auth.googleID;
    const url = `${ API_BASE_URL }/user/${googleID}`;
    return fetch(url,
      {
        method: 'put',
        headers: { 'Content-type': 'application/json', 'Authorization': 'bearer ' + token },
        body: JSON.stringify({
          players: [
            {
              'Name': getState().draft.draftedPlayers.name,
              'Position': getState().draft.draftedPlayers.position,
              'Team': getState().draft.draftedPlayers.team,
              'Rank': getState().draft.draftedPlayers.rank,
              'Tier': getState().draft.draftedPlayers.tier
            }
          ]
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