/**
 * Created by uroszivaljevic on 10/6/17.
 */
import initialState from "../store/initialState";
import { LeaguesActions } from "../actions/actionTypes";

export default (state = initialState.leagues, action) => {
    switch (action.type) {
        case LeaguesActions.GET_LEAGUES_SUCCESS:
            return { ...state, leagues: action.payload.leagues };
        default:
            return state;
    }

}