import "isomorphic-fetch";
import { API_BASE_URL } from '../../../config.js';
const Cookies = require("js-cookie");

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => {
    return {
        type: FETCH_USER_SUCCESS,
        user
    };
};

export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const fetchUserError = function (error) {
    return {
        type: FETCH_USER_ERROR,
        error: error
    };
};


export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const logoutUserSuccess = function () {
    return {
        type: LOGOUT_USER_SUCCESS
    }
}


// GET request for user info from DB with GoogleID 
export const fetchUser = function () {
    return function (dispatch, getState) {
        const url = `${API_BASE_URL}/user`;
        const token = Cookies.get('accessToken');
        const headers = new Headers({
            Authorization: 'bearer ' + token
        });
        return fetch(url,
            {headers: headers})
            .then(function (response) {
                if (response.status < 200 || response.status >= 300) {
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
    }
};

export const logoutUser = function () {
    return function (dispatch) {
        const token = Cookies.get('accessToken');
        const headers = new Headers({
            Authorization: 'bearer ' + token
        });
        const url = `${API_BASE_URL}/logout`;
        return fetch(url, { headers: headers }).then(function (response) {
            if (response.status < 200 || response.status >= 300) {
                const error = new Error(response.statusText);
                error.response = response;
                throw error;
            }
            return response;
        })
            .then(function () {
                Cookies.remove('accessToken')
                window.location.replace("/")
                return dispatch(
                    logoutUserSuccess()
                );
            })
    }
};
