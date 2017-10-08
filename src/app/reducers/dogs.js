/**
 * Created by uroszivaljevic on 10/1/17.
 */

import { DogsActions } from "../actions/actionTypes";
import initialState from "../store/initialState";

export default (state = initialState.dogs, action) => {

    switch (action.type) {
        case DogsActions.GET_DOGS_STARTED:
            return { ...state, isLoading: true };
        case DogsActions.GET_DOGS_SUCCESS:
            return { ...state, dogs: action.payload.dogs, isLoading: false };
        case DogsActions.ADD_DOG_SUCCESS:
            return { ...state, dogs: [action.payload.dog].concat(state.dogs)};
        default:
            return state;
    }
}