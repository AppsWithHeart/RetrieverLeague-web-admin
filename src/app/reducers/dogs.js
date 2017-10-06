/**
 * Created by uroszivaljevic on 10/1/17.
 */

import initialState from "../store/initialState";

export default (state = initialState.dogs, action) => {

    switch (action.type) {
        case "GET_DOGS":
            return action.payload.dogs;
        default:
            return state;
    }
}