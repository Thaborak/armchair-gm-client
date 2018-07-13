import { FETCH_TEAM_STATS_SUCCESS, FETCH_TEAM_PIC_SUCCESS } from "../actions/team";

const initialState = {
    teamStats: [],
    teamPics: []
};

export const teamReducer = function (state = initialState, action) {
    switch (action.type) {
        // Updates state upon fetch user success
        case FETCH_TEAM_STATS_SUCCESS:
        // player = action.team.cumulativeplayerstats.playerstatsentry
            return Object.assign({}, state, {
                teamStats: [...state.teamStats, action.team.cumulativeplayerstats.playerstatsentry[0].player]
            });
        case FETCH_TEAM_PIC_SUCCESS:
            return Object.assign({}, state, {
                teamPics: [...state.teamPics, action.pic.activeplayers.playerentry[0].player.officialImageSrc]
            });
    }
    return state;
};
