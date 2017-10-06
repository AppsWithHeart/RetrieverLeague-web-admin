/**
 * Created by uroszivaljevic on 10/1/17.
 */
import axios from "axios";

import { DogsActions } from "./actionTypes";
import { Resources } from "../utils/net";

export const getDogs = () => {

    return dispatch => {
        axios.get(Resources.DOGS)
            .then(response => {
                dispatch({
                    type: DogsActions.GET_DOGS,
                    payload: {
                        dogs: response.data
                    }
                });
            });
    };
};