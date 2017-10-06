/**
 * Created by uroszivaljevic on 10/6/17.
 */
import axios from "axios";

import { LeaguesActions } from "./actionTypes";
import { Resources } from "../utils/net";

export const getLeagues = () => {
    return dispatch => {
        axios.get(Resources.LEAGUES)
            .then(response => {
                dispatch({
                    type: LeaguesActions.GET_LEAGUES,
                    payload: {
                        leagues: response.data
                    }
                })
            })
    }
}