import { FETCH_TEAM_STATS_SUCCESS, FETCH_TEAM_PIC_SUCCESS } from "../actions/team";

const initialState = {
    teamStats: [],
    teamPics: []
};

export const teamReducer = function (state = initialState, action) {
    switch (action.type) {
        // Updates state upon fetch user success
        case FETCH_TEAM_STATS_SUCCESS:
            return Object.assign({}, state, {
                teamStats: [...state.teamStats, action.team.cumulativeplayerstats.playerstatsentry]
            });
        case FETCH_TEAM_PIC_SUCCESS:
            return Object.assign({}, state, {
                teamPics: [...state.teamPics, action.pic.activeplayers.playerentry]
            });
    }
    return state;
};
