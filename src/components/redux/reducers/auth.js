import { FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "../actions/auth";
import update from "react-addons-update";

const initialState = {
    googleID: ''
};

export const authReducer = function (state, action) {
    state = state || initialState;
    switch (action.type) {

        // Updates state upon fetch user success
        case FETCH_USER_SUCCESS:
            console.log('FETCH_USER_SUCCESS');
            const user = action.user;
            const newState = Object.assign({}, state, {
                players: user.players,
                googleID: user.googleID
            });
            return newState;

        case FETCH_USER_ERROR:
            return state;
    }
};
