import { FETCH_USER_SUCCESS, FETCH_USER_ERROR, LOGOUT_USER_SUCCESS } from "../actions/auth";
import update from "react-addons-update";

const initialState = {
    googleID: null,
};

export const authReducer = function (state = initialState, action) {
    switch (action.type) {
        // Updates state upon fetch user success
        case FETCH_USER_SUCCESS:
            const user = action.user;
            const newState = Object.assign({}, state, {
                googleID: user.googleID
            });
            return newState;

        case FETCH_USER_ERROR:
            return state;

        case LOGOUT_USER_SUCCESS:
            return initialState

    }
    return state;
};
