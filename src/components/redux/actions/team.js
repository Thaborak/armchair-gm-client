import "isomorphic-fetch";
import { fetchUserSuccess, fetchUserError } from './auth';
import { API_BASE_URL } from '../../../config.js';



export const SAVE_TEAM_SUCCESS = 'SAVE_TEAM_SUCCESS';
export const saveTeamSuccess = (team) => ({
  type: SAVE_TEAM_SUCCESS,
  team
})

export const FETCH_TEAM_STATS_SUCCESS = 'FETCH_TEAM_STATS_SUCCESS';
export const fetchTeamStatsSuccess = (team) => ({
  type: FETCH_TEAM_STATS_SUCCESS,
  team
})

export const FETCH_TEAM_PIC_SUCCESS = 'FETCH_TEAM_PIC_SUCCESS';
export const fetchTeamPicSuccess = (pic) => ({
  type: FETCH_TEAM_PIC_SUCCESS,
  pic
})

const Cookies = require("js-cookie");
// PUT request to add player into user schema 
export const addPlayer = function (team) {
  return function (dispatch, getState) {
    const token = Cookies.get('accessToken');
    const googleID = getState().auth.googleID;
    const url = `${API_BASE_URL}/user/${googleID}`;
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

export const fetchTeamStats = (team) => (dispatch) => {
  if (!team) {
    return
  }
  let array = team
  array.forEach(element => {
    console.log(element);
    let fullname = element.Name
    fullname = fullname.split(" ", 2);
    fullname = fullname.join('-').toLowerCase();
    let query = fullname
    const url = `https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/cumulative_player_stats.json?playerstats=Att,Comp,Yds,TD&player=${query}`;
    console.log(query)
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('thaborak' + ':' + 'petproject')
      },
    })
      .then(res => {
        console.log(res)
        return res.json();
      })
      .then(results => {
        console.log(results)
        return dispatch(fetchTeamStatsSuccess(results));
      })
  })
  // .catch(err => dispatch(fetchError(err.message)));
};

export const fetchTeamPic = (pic) => (dispatch) => {
  if (!pic) {
    return
  }
  let array = pic
  
    
  
for (let i = 0; i < array.length; i++) {
  const element = array[i];
    console.log(element);
    let fullname = element.Name
    fullname = fullname.split(" ", 2);
    fullname = fullname.join('-').toLowerCase();
    let query = fullname
    const url = `https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-regular/active_players.json?player=${query}`;
    console.log(query)
     fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa('thaborak' + ':' + 'petproject')
      },
    })
      .then(res => {
        return res.json();
      })
      .then(results => {
        return dispatch(fetchTeamPicSuccess(results));
      })
  }
  // .catch(err => dispatch(fetchError(err.message)));
};
