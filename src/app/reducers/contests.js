/**
 * Created by uroszivaljevic on 10/28/17.
 */
import initialState from "../store/initialState";
import { ContestsActions } from "../actions/actionTypes";


export default (state = initialState.contests, action) => {
    switch (action.type) {
        case ContestsActions.GET_CONTESTS_STARTED:
            return { ...state, isLoading: true };
        case ContestsActions.GET_CONTESTS_SUCCESS:
            return { ...state, contests: action.payload.contests, isLoading: false };
        case ContestsActions.GET_CONTESTS_FAILED:
            return { ...state, isLoading: false };
        case ContestsActions.ADD_CONTEST_SUCCESS:
            return { ...state, contests: [action.payload.contest].concat(state.contests)};
        default:
            return state;
    }
 }