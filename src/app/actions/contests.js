/**
 * Created by uroszivaljevic on 10/28/17.
 */
import axios from "axios";

import { ContestsActions } from "./actionTypes";
import { Resources } from "../utils/net";


export const getContests = () => {
    return dispatch => {
        dispatch({type: ContestsActions.GET_CONTESTS_STARTED});
        axios.get(Resources.CONTESTS)
            .then(response => {
                dispatch({
                    type: ContestsActions.GET_CONTESTS_SUCCESS,
                    payload: {
                        contests: response.data
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ContestsActions.GET_CONTESTS_FAILED
                })
            });
    }
}

export const addContest = (contest) => {
    return dispatch => {
        dispatch({ type: ContestsActions.ADD_CONTEST_STARTED });
        axios.post(Resources.CONTESTS, contest)
            .then(response => {
                dispatch({
                    type: ContestsActions.ADD_CONTEST_SUCCESS,
                    payload: {
                        contest: response.data
                    }
                })
            })
            .catch(error => {
                dispatch({
                    type: ContestsActions.ADD_CONTEST_FAILED
                })
            })
    }
}