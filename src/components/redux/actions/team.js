import "isomorphic-fetch";
import { Cookies } from "js-cookie";
import { fetchUserSuccess, fetchUserError } from './auth';
// PUT request to add player into user schema 
export const addPlayer = function (props) {
  return function (dispatch) {
    const token = Cookies.get('accessToken');
    const userId = props.userId;
    const url = `/user/${userId}`;
    return fetch(url,
      {
        method: 'put',
        headers: { 'Content-type': 'application/json', 'Authorization': 'bearer ' + token },
        body: JSON.stringify({
          player: {
            'name': props.name,
            'position': props.position,
            'team': props.team,
            'rank': props.rank,
            'tier': props.tier
          }
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
          fetchUserSuccess(response)
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
          'googleID': props.userId
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